
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface OmiseEvent {
  object: string;
  id: string;
  data: {
    object: string;
    id: string;
    status: string;
    amount: number;
    currency: string;
    description: string;
    metadata?: any;
  };
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
    console.log('Omise Webhook received:', JSON.stringify(body, null, 2))

    const event = body as OmiseEvent
    
    // Handle charge events
    if (event.object === 'event' && event.data.object === 'charge') {
      const charge = event.data
      const chargeId = charge.id
      const status = charge.status
      
      console.log(`Processing charge ${chargeId} with status: ${status}`)
      
      // Find the order with this charge ID
      const { data: order, error: findError } = await supabase
        .from('orders')
        .select('*')
        .eq('omise_charge_id', chargeId)
        .single()
      
      if (findError || !order) {
        console.log('Order not found for charge:', chargeId, findError)
        return new Response(JSON.stringify({ success: true, message: 'Order not found' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      console.log('Found order:', order)
      
      // Update order status based on charge status
      let newStatus = 'pending'
      let shouldNotify = false
      
      if (status === 'successful' || status === 'paid') {
        newStatus = 'paid'
        shouldNotify = true
      } else if (status === 'failed') {
        newStatus = 'failed'
        shouldNotify = true
      }
      
      if (newStatus !== order.status) {
        const { error: updateError } = await supabase
          .from('orders')
          .update({ 
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', order.id)
        
        if (updateError) {
          console.error('Failed to update order status:', updateError)
        } else {
          console.log(`Order ${order.id} status updated to: ${newStatus}`)
        }
        
        // Send LINE notification if payment successful
        if (shouldNotify && newStatus === 'paid') {
          const message = `🎉 การชำระเงินสำเร็จแล้ว!\n\n✅ บริการ: ${order.service_name}\n📦 จำนวน: ${order.quantity}\n💰 ราคา: ${Number(order.total_price).toLocaleString('th-TH')} บาท\n\n📋 หมายเลขออเดอร์: ${order.id.substring(0, 8)}\n⏰ เวลา: ${new Date().toLocaleString('th-TH')}\n\nขอบคุณที่ใช้บริการ! 🙏`
          
          await sendLineMessage(order.line_user_id, message)
        } else if (shouldNotify && newStatus === 'failed') {
          const message = `❌ การชำระเงินล้มเหลว\n\n🛍️ บริการ: ${order.service_name}\n📦 จำนวน: ${order.quantity}\n💰 ราคา: ${Number(order.total_price).toLocaleString('th-TH')} บาท\n\nกรุณาลองชำระเงินใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่`
          
          await sendLineMessage(order.line_user_id, message)
        }
      }
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    console.error('Omise Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function sendLineMessage(userId: string, message: string) {
  try {
    const lineAccessToken = Deno.env.get('LINE_ACCESS_TOKEN')
    if (!lineAccessToken) {
      console.error('LINE_ACCESS_TOKEN not configured')
      return
    }
    
    const pushData = {
      to: userId,
      messages: [{
        type: 'text',
        text: message
      }]
    }
    
    console.log('Sending LINE push message:', pushData)
    
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lineAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pushData)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('LINE push error:', response.status, errorText)
    } else {
      console.log('LINE push message sent successfully')
    }
    
  } catch (error) {
    console.error('LINE push message error:', error)
  }
}
