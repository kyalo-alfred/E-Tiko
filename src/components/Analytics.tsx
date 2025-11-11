import { useEffect, useState } from 'react';
import { analyticsApi } from '../lib/api';
import type { AnalyticsData } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp, Ticket, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface AnalyticsProps {
  organizerId: string;
}

export function Analytics({ organizerId }: AnalyticsProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [organizerId]);

  const loadAnalytics = async () => {
    try {
      const analytics = await analyticsApi.getOrganizerAnalytics(organizerId);
      setData(analytics);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    {
      title: 'Total Revenue',
      value: `KES ${data.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Total earnings from all events',
    },
    {
      title: 'Tickets Sold',
      value: data.totalTicketsSold.toString(),
      icon: Ticket,
      description: 'Total tickets sold',
    },
    {
      title: 'Active Events',
      value: data.totalEvents.toString(),
      icon: Calendar,
      description: 'Events currently listed',
    },
    {
      title: 'Avg. Revenue/Event',
      value: `KES ${data.totalEvents > 0 ? Math.round(data.totalRevenue / data.totalEvents).toLocaleString() : 0}`,
      icon: TrendingUp,
      description: 'Average revenue per event',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Performance</CardTitle>
            <CardDescription>Tickets sold and revenue by event</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.eventSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" fill="hsl(var(--primary))" name="Tickets Sold" />
                <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--chart-2))" name="Revenue (KES)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Tickets"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Revenue (KES)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
