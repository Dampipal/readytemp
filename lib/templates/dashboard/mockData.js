export const mockData = {
  stats: {
    revenue: 154280,
    users: 2847,
    orders: 1234,
    conversionRate: 3.2,
  },
  chartData: {
    revenue: [
      { label: 'Jan', value: 12000 },
      { label: 'Feb', value: 15000 },
      { label: 'Mar', value: 18000 },
      { label: 'Apr', value: 16000 },
      { label: 'May', value: 21000 },
      { label: 'Jun', value: 19000 },
    ],
    users: [
      {
        id: 'users',
        data: [
          { x: 'Jan', y: 1000 },
          { x: 'Feb', y: 1500 },
          { x: 'Mar', y: 1800 },
          { x: 'Apr', y: 2200 },
          { x: 'May', y: 2500 },
          { x: 'Jun', y: 2800 },
        ],
      },
    ],
    trafficSources: [
      { id: 'Direct', value: 35 },
      { id: 'Social', value: 25 },
      { id: 'Organic', value: 20 },
      { id: 'Referral', value: 15 },
      { id: 'Other', value: 5 },
    ],
    conversions: [
      {
        id: 'conversion',
        data: [
          { x: 'Jan', y: 2.8 },
          { x: 'Feb', y: 3.1 },
          { x: 'Mar', y: 2.9 },
          { x: 'Apr', y: 3.3 },
          { x: 'May', y: 3.2 },
          { x: 'Jun', y: 3.5 },
        ],
      },
    ],
  },
  activities: [
    {
      id: '1',
      user: 'John Doe',
      action: 'Created a new order #12345',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'Updated product inventory',
      timestamp: '15 minutes ago',
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'Refunded order #12340',
      timestamp: '1 hour ago',
    },
    {
      id: '4',
      user: 'Sarah Wilson',
      action: 'Added new product category',
      timestamp: '2 hours ago',
    },
  ],
}; 