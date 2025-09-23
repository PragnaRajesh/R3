import React from 'react';
import { User } from '../App';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  Building
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SharedHomeProps {
  user: User;
}

const analyticsData = [
  { id: 1, name: 'Blue Collar', count: 234, change: 12.5, color: '#1A4DFF' },
  { id: 2, name: 'Lateral', count: 189, change: -3.2, color: '#B5D7FF' },
  { id: 3, name: 'Sales', count: 156, change: 8.7, color: '#D9EBFF' },
  { id: 4, name: 'IT', count: 298, change: 15.3, color: '#0A1F44' },
  { id: 5, name: 'Non-IT', count: 142, change: 5.1, color: '#6B7280' },
  { id: 6, name: 'Operations', count: 167, change: -1.8, color: '#1A4DFF' },
  { id: 7, name: 'Tech', count: 203, change: 9.4, color: '#B5D7FF' },
  { id: 8, name: 'Admin', count: 89, change: 3.6, color: '#D9EBFF' }
];

const topPerformers = [
  { id: 1, name: 'Sarah Chen', team: 'IT', selections: 23, target: 25 },
  { id: 2, name: 'Mike Johnson', team: 'Sales', selections: 19, target: 20 },
  { id: 3, name: 'Lisa Wong', team: 'Tech', selections: 21, target: 22 },
  { id: 4, name: 'David Kumar', team: 'Operations', selections: 18, target: 20 }
];

const pieChartData = analyticsData.map(item => ({ name: item.name, value: item.count, color: item.color }));

export function SharedHome({ user }: SharedHomeProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-gradient-sky rounded-2xl p-8 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-semibold text-navy-dark mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-lg text-navy-dark mb-6">
              Here's your recruitment performance overview
            </p>
            <p className="text-gray-medium max-w-lg">
              Track your team's progress, analyze performance metrics, and manage your recruitment pipeline with comprehensive insights and real-time data.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-48 bg-white rounded-xl shadow-soft flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-blue-bright mx-auto mb-4" />
                <p className="text-gray-medium">Dashboard Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Analytics */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Team Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-dark">{item.name}</h3>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-semibold text-navy-dark">{item.count}</span>
                <div className={`flex items-center text-sm ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full transition-smooth" style={{ backgroundColor: item.color, width: `${Math.min((item.count / 300) * 100, 100)}%` }} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Performance Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Performance Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performers */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-bright" />
              Top Performers
            </h3>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-medium w-4">#{index + 1}</span>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-blue-bright text-white">
                        {performer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-dark text-sm">{performer.name}</p>
                    <p className="text-xs text-gray-medium">{performer.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-navy-dark">{performer.selections}/{performer.target}</p>
                    <p className="text-xs text-gray-medium">selections</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Team Summary */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-bright" />
              Top Performing Team
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-bright rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-navy-dark text-lg mb-2">IT Team</h4>
              <p className="text-3xl font-semibold text-blue-bright mb-2">298</p>
              <p className="text-gray-medium text-sm mb-4">Total Selections</p>
              <div className="flex items-center justify-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                15.3% vs last month
              </div>
            </div>
          </Card>

          {/* Distribution Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-4">Team Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [value as number, name as string]}
                    labelStyle={{ color: '#0A1F44' }}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
