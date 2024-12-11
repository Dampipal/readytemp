import { getFileExtension } from '../../utils/fileHelpers.js';
import { generateIndexHtml } from '../../generators/htmlGenerator.js';

export function getDashboardTemplate(projectName, language) {
  const ext = getFileExtension(language);
  
  return {
    'public/index.html': generateIndexHtml(projectName),
    'public/manifest.json': JSON.stringify({
      "short_name": projectName,
      "name": projectName,
      "icons": [
        {
          "src": "favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#000000",
      "background_color": "#ffffff"
    }, null, 2),
    'public/robots.txt': 'User-agent: *\nAllow: /',
    [`src/index.${ext}`]: getIndexFile(),
    [`src/App.${ext}`]: getAppFile(language),
    [`src/components/charts/BarChart.${ext}`]: getBarChartComponent(language),
    [`src/components/charts/LineChart.${ext}`]: getLineChartComponent(language),
    [`src/components/charts/PieChart.${ext}`]: getPieChartComponent(language),
    [`src/components/widgets/StatCard.${ext}`]: getStatCardComponent(language),
    [`src/components/widgets/RecentActivities.${ext}`]: getRecentActivitiesComponent(language),
    [`src/components/layout/Sidebar.${ext}`]: getSidebarComponent(language),
    [`src/pages/Dashboard.${ext}`]: getDashboardPage(language),
    [`src/pages/Analytics.${ext}`]: getAnalyticsPage(language),
    [`src/hooks/useStats.${ext}`]: getUseStatsHook(language),
    [`src/data/mockData.${ext}`]: getMockData(),
  };
}

function getIndexFile() {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`;
}

function getAppFile(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';

const App${ext} = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;`;
}

function getBarChartComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ data: any[] }>' : '';
  return `import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const BarChart${ext} = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="label"
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={{ scheme: 'nivo' }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default BarChart;`;
}

function getLineChartComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ data: any[] }>' : '';
  return `import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineChart${ext} = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default LineChart;`;
}

function getPieChartComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ data: any[] }>' : '';
  return `import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChart${ext} = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      />
    </div>
  );
};

export default PieChart;`;
}

function getStatCardComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ title: string; value: string | number; icon: React.ReactNode; trend: number }>' : '';
  return `import React from 'react';

const StatCard${ext} = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-500">{title}</div>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={\`flex items-center \${trend > 0 ? 'text-green-500' : 'text-red-500'}\`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        <span className="text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;`;
}

function getRecentActivitiesComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ activities: Activity[] }>' : '';
  const types = language === 'TypeScript' ? `
interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}` : '';

  return `import React from 'react';
${types}

const RecentActivities${ext} = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{activity.user}</p>
              <p className="text-gray-500">{activity.action}</p>
            </div>
            <div className="text-sm text-gray-400">
              {activity.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;`;
}

function getSidebarComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar${ext} = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/customers', label: 'Customers', icon: '👥' },
    { path: '/products', label: 'Products', icon: '📦' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={\`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white \${
              location.pathname === item.path ? 'bg-gray-700 text-white' : ''
            }\`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;`;
}

function getDashboardPage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import StatCard from '../components/widgets/StatCard';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import RecentActivities from '../components/widgets/RecentActivities';
import { useStats } from '../hooks/useStats';

const Dashboard${ext} = () => {
  const { stats, chartData, activities } = useStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Revenue"
          value={\`$\${stats.revenue.toLocaleString()}\`}
          icon="💰"
          trend={12}
        />
        <StatCard
          title="Total Users"
          value={stats.users.toLocaleString()}
          icon="👥"
          trend={8}
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.toLocaleString()}
          icon="📦"
          trend={-3}
        />
        <StatCard
          title="Conversion Rate"
          value={\`\${stats.conversionRate}%\`}
          icon="📈"
          trend={5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <BarChart data={chartData.revenue} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <LineChart data={chartData.users} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;`;
}

function getAnalyticsPage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import { useStats } from '../hooks/useStats';

const Analytics${ext} = () => {
  const { chartData } = useStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <PieChart data={chartData.trafficSources} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Conversion Trends</h2>
          <LineChart data={chartData.conversions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;`;
}

function getUseStatsHook(language) {
  const types = language === 'TypeScript' ? `
interface Stats {
  revenue: number;
  users: number;
  orders: number;
  conversionRate: number;
}

interface ChartData {
  revenue: any[];
  users: any[];
  trafficSources: any[];
  conversions: any[];
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}` : '';

  return `import { useState, useEffect } from 'react';
import { mockData } from '../data/mockData';
${types}

export function useStats() {
  const [stats, setStats] = useState(mockData.stats);
  const [chartData, setChartData] = useState(mockData.chartData);
  const [activities, setActivities] = useState(mockData.activities);

  useEffect(() => {
    // Here you would typically fetch real data from your API
    // For now, we're using mock data
    setStats(mockData.stats);
    setChartData(mockData.chartData);
    setActivities(mockData.activities);
  }, []);

  return { stats, chartData, activities };
}`;
}

function getMockData() {
  return `export const mockData = {
  stats: {
    revenue: 154280,
    users: 2847,
    orders: 1234,
    conversionRate: 3.2
  },
  chartData: {
    revenue: [
      { label: 'Jan', value: 12000 },
      { label: 'Feb', value: 15000 },
      { label: 'Mar', value: 18000 },
      { label: 'Apr', value: 16000 },
      { label: 'May', value: 21000 },
      { label: 'Jun', value: 19000 }
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
          { x: 'Jun', y: 2800 }
        ]
      }
    ],
    trafficSources: [
      { id: 'Direct', value: 35 },
      { id: 'Social', value: 25 },
      { id: 'Organic', value: 20 },
      { id: 'Referral', value: 15 },
      { id: 'Other', value: 5 }
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
          { x: 'Jun', y: 3.5 }
        ]
      }
    ]
  },
  activities: [
    {
      id: '1',
      user: 'John Doe',
      action: 'Created a new order #12345',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'Updated product inventory',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'Refunded order #12340',
      timestamp: '1 hour ago'
    },
    {
      id: '4',
      user: 'Sarah Wilson',
      action: 'Added new product category',
      timestamp: '2 hours ago'
    }
  ]
};`;
} 