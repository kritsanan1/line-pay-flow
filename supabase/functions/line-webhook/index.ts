
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-line-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface LineEvent {
  type: string;
  message?: {
    type: string;
    text: string;
  };
  source: {
    userId: string;
  };
  replyToken: string;
}

interface Service {
  id: string;
  service_name: string;
  price_per_unit: number;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    console.log('LINE Webhook received:', JSON.stringify(body, null, 2))

    // Verify LINE signature (in production, you should verify this properly)
    // const signature = req.headers.get('x-line-signature')
    
    const events: LineEvent[] = body.events || []
    
    for (const event of events) {
      if (event.type === 'message' && event.message?.type === 'text') {
        const text = event.message.text
        const userId = event.source.userId
        const replyToken = event.replyToken
        
        console.log(`Processing message: "${text}" from user: ${userId}`)
        
        // Parse command: "สั่งซื้อ [service] [quantity]"
        const orderMatch = text.match(/^สั่งซื้อ\s+(.+?)\s+(\d+)$/)
        
        if (orderMatch) {
          const [, serviceName, quantityStr] = orderMatch
          const quantity = parseInt(quantityStr)
          
          console.log(`Order parsed - Service: ${serviceName}, Quantity: ${quantity}`)
          
          // Find service
          const { data: services, error: serviceError } = await supabase
            .from('services')
            .select('*')
            .eq('service_name', serviceName)
            .eq('is_active', true)
            .single()
          
          if (serviceError || !services) {
            console.log('Service not found:', serviceError)
            await replyToLine(replyToken, `ไม่พบบริการ "${serviceName}"\n\nบริการที่มี:\n• บริการA (100 บาท)\n• บริการB (250 บาท)\n• บริการC (500 บาท)`)
            continue
          }
          
          const service = services as Service
          const totalPrice = service.price_per_unit * quantity
          
          console.log(`Calculating price: ${service.price_per_unit} x ${quantity} = ${totalPrice}`)
          
          // Create Omise charge
          const omiseResult = await createOmiseCharge(totalPrice, `Payment for ${serviceName} x${quantity}`)
          
          if (!omiseResult.success) {
            console.error('Omise charge creation failed:', omiseResult.error)
            await replyToLine(replyToken, 'เกิดข้อผิดพลาดในการสร้างการชำระเงิน กรุณาลองใหม่อีกครั้ง')
            continue
          }
          
          // Save order to database
          const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
              user_id: userId,
              line_user_id: userId,
              service_id: service.id,
              service_name: serviceName,
              quantity: quantity,
              price_per_unit: service.price_per_unit,
              total_price: totalPrice,
              status: 'pending',
              omise_charge_id: omiseResult.chargeId,
              payment_url: omiseResult.paymentUrl
            })
            .select()
            .single()
          
          if (orderError) {
            console.error('Failed to save order:', orderError)
            await replyToLine(replyToken, 'เกิดข้อผิดพลาดในการบันทึกออเดอร์')
            continue
          }
          
          console.log('Order saved successfully:', order)
          
          // Reply with payment info
          const replyMessage = `✅ รับออเดอร์เรียบร้อย!\n\n🛍️ บริการ: ${serviceName}\n📦 จำนวน: ${quantity}\n💰 ราคารวม: ${totalPrice.toLocaleString('th-TH')} บาท\n\n💳 กรุณาชำระเงินที่ลิงก์นี้:\n${omiseResult.paymentUrl}\n\n⏰ หมดเวลาใน 15 นาที`
          
          await replyToLine(replyToken, replyMessage)
          
        } else {
          // Invalid format
          console.log('Invalid command format')
          await replyToLine(replyToken, '❌ รูปแบบคำสั่งไม่ถูกต้อง\n\n✅ กรุณาส่งตามรูปแบบ:\n"สั่งซื้อ [บริการ] [จำนวน]"\n\nบริการที่มี:\n• บริการA (100 บาท)\n• บริการB (250 บาท)\n• บริการC (500 บาท)\n\n💡 ตัวอย่าง: สั่งซื้อ บริการA 2')
        }
      }
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    console.error('LINE Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function createOmiseCharge(amount: number, description: string) {
  try {
    const omiseSecretKey = Deno.env.get('OMISE_SECRET_KEY')
    if (!omiseSecretKey) {
      throw new Error('OMISE_SECRET_KEY not configured')
    }
    
    // Create charge with PromptPay source
    const chargeData = {
      amount: Math.round(amount * 100), // Convert to satang
      currency: 'THB',
      source: {
        type: 'promptpay'
      },
      description: description,
      metadata: {
        integration: 'line_payment_processor'
      }
    }
    
    console.log('Creating Omise charge:', chargeData)
    
    const response = await fetch('https://api.omise.co/charges', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(omiseSecretKey + ':')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chargeData)
    })
    
    const result = await response.json()
    console.log('Omise charge response:', result)
    
    if (!response.ok) {
      throw new Error(`Omise API error: ${result.message || 'Unknown error'}`)
    }
    
    return {
      success: true,
      chargeId: result.id,
      paymentUrl: result.source?.scannable_code?.image?.download_uri || result.authorize_uri || `https://pay.omise.co/${result.id}`
    }
    
  } catch (error) {
    console.error('Omise charge creation error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

async function replyToLine(replyToken: string, message: string) {
  try {
    const lineAccessToken = Deno.env.get('LINE_ACCESS_TOKEN')
    if (!lineAccessToken) {
      console.error('LINE_ACCESS_TOKEN not configured')
      return
    }
    
    const replyData = {
      replyToken: replyToken,
      messages: [{
        type: 'text',
        text: message
      }]
    }
    
    console.log('Sending LINE reply:', replyData)
    
    const response = await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lineAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyData)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('LINE reply error:', response.status, errorText)
    } else {
      console.log('LINE reply sent successfully')
    }
    
  } catch (error) {
    console.error('LINE reply error:', error)
  }
}
