
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, MessageSquare, CreditCard, Database, Webhook, LineChart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface Service {
  id: string;
  service_name: string;
  price_per_unit: number;
  description: string;
  is_active: boolean;
}

interface Order {
  id: string;
  user_id: string;
  line_user_id: string;
  service_name: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  status: string;
  created_at: string;
  omise_charge_id?: string;
  payment_url?: string;
}

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  paidOrders: number;
  totalRevenue: number;
}

const LineProcessor = () => {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    paidOrders: 0,
    totalRevenue: 0
  });

  // Fetch services
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('service_name');
      
      if (error) throw error;
      return data as Service[];
    }
  });

  // Fetch recent orders
  const { data: orders, isLoading: ordersLoading, refetch: refetchOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as Order[];
    }
  });

  // Calculate stats
  useEffect(() => {
    if (orders) {
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(o => o.status === 'pending').length;
      const paidOrders = orders.filter(o => o.status === 'paid').length;
      const totalRevenue = orders
        .filter(o => o.status === 'paid')
        .reduce((sum, o) => sum + Number(o.total_price), 0);

      setStats({ totalOrders, pendingOrders, paidOrders, totalRevenue });
    }
  }, [orders]);

  // Real-time subscription for orders
  useEffect(() => {
    const channel = supabase
      .channel('orders_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders'
      }, (payload) => {
        console.log('Order updated:', payload);
        refetchOrders();
        
        if (payload.eventType === 'UPDATE' && payload.new.status === 'paid') {
          toast.success(`การชำระเงินสำเร็จ! ออเดอร์ ${payload.new.service_name} จำนวน ${payload.new.quantity}`);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetchOrders]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />ชำระแล้ว</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />รอชำระ</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />ล้มเหลว</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return `฿${price.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('th-TH');
  };

  const testWebhook = async () => {
    try {
      const response = await fetch('/functions/v1/line-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: [{
            type: 'message',
            message: {
              type: 'text',
              text: 'สั่งซื้อ บริการA 2'
            },
            source: {
              userId: 'test-user-123'
            },
            replyToken: 'test-reply-token'
          }]
        })
      });
      
      if (response.ok) {
        toast.success('ทดสอบ Webhook สำเร็จ!');
        refetchOrders();
      } else {
        toast.error('ทดสอบ Webhook ล้มเหลว');
      }
    } catch (error) {
      console.error('Test webhook error:', error);
      toast.error('เกิดข้อผิดพลาดในการทดสอบ');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <MessageSquare className="w-10 h-10 text-green-500" />
            LINE Payment Processor
          </h1>
          <p className="text-lg text-gray-600">ระบบประมวลผลการชำระเงินผ่าน LINE OA และ Omise PromptPay</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="w-4 h-4" />
                ออเดอร์ทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                รอชำระ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                ชำระแล้ว
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.paidOrders}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                รายได้รวม
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Services and Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-green-500" />
                บริการที่เปิดให้บริการ
              </CardTitle>
              <CardDescription>รายการบริการที่สามารถสั่งซื้อผ่าน LINE ได้</CardDescription>
            </CardHeader>
            <CardContent>
              {servicesLoading ? (
                <div className="text-center py-4">กำลังโหลด...</div>
              ) : (
                <div className="space-y-3">
                  {services?.map((service) => (
                    <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{service.service_name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatPrice(service.price_per_unit)}</div>
                        <div className="text-xs text-gray-500">ต่อหน่วย</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5 text-blue-500" />
                ออเดอร์ล่าสุด
              </CardTitle>
              <CardDescription>รายการออเดอร์ที่เข้ามาล่าสุด</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-center py-4">กำลังโหลด...</div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {orders?.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>ยังไม่มีออเดอร์</p>
                    </div>
                  ) : (
                    orders?.map((order) => (
                      <div key={order.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{order.service_name}</h4>
                            <p className="text-sm text-gray-600">จำนวน: {order.quantity} | รวม: {formatPrice(order.total_price)}</p>
                            <p className="text-xs text-gray-400">{formatDateTime(order.created_at)}</p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        {order.payment_url && order.status === 'pending' && (
                          <div className="text-xs">
                            <a href={order.payment_url} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-500 hover:underline">
                              ลิงก์ชำระเงิน
                            </a>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Test Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              การทดสอบระบบ
            </CardTitle>
            <CardDescription>ทดสอบการทำงานของ Webhook และระบบชำระเงิน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">วิธีการทดสอบ:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                  <li>ส่งข้อความใน LINE: "สั่งซื้อ บริการA 2"</li>
                  <li>ระบบจะตอบกลับด้วยราคาและลิงก์ชำระเงิน</li>
                  <li>ชำระเงินผ่าน PromptPay QR Code</li>
                  <li>ระบบจะแจ้งยืนยันการชำระเงินใน LINE</li>
                </ol>
              </div>
              <Button onClick={testWebhook} className="bg-green-500 hover:bg-green-600">
                ทดสอบ Webhook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Webhook URLs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="w-5 h-5 text-gray-500" />
              Webhook URLs
            </CardTitle>
            <CardDescription>URL สำหรับตั้งค่าใน LINE และ Omise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">LINE Webhook URL:</label>
                <div className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono">
                  {window.location.origin}/functions/v1/line-webhook
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Omise Webhook URL:</label>
                <div className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono">
                  {window.location.origin}/functions/v1/omise-webhook
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LineProcessor;
