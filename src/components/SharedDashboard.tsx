import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CandidateTable } from './CandidateTable';

const kpiData = [
  { label: 'Targets Pending', value: 47, total: 100, color: 'bg-red-500' },
  { label: 'Selections', value: 234, total: 300, color: 'bg-blue-500' },
  { label: 'Joined', value: 189, total: 234, color: 'bg-green-500' },
  { label: 'Open Positions', value: 56, total: 80, color: 'bg-yellow-500' }
];

const performanceCards = [
  { label: 'Quality Score', value: 87, target: 90, unit: '%', trend: 'up', change: 3.2 },
  { label: 'Target Achievement', value: 92, target: 100, unit: '%', trend: 'up', change: 5.1 },
  { label: 'Avg Time to Hire', value: 24, target: 21, unit: ' days', trend: 'down', change: -2.3 },
  { label: 'Source Efficiency', value: 78, target: 85, unit: '%', trend: 'up', change: 1.8 }
];

export function SharedDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('november');
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Recruiter KPIs */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Recruiter KPIs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              className={`p-4 gap-0.5 cursor-pointer transition-smooth hover:shadow-lg ${selectedKPI === kpi.label ? 'ring-2 ring-blue-bright' : ''}`}
              onClick={() => setSelectedKPI(selectedKPI === kpi.label ? null : kpi.label)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-navy-dark text-sm">{kpi.label}</h3>
              </div>
              <p className="text-xl font-semibold text-navy-dark mb-2">{kpi.value}</p>
              <div className="flex items-center justify-between text-sm text-gray-medium mb-3">
                <span>of {kpi.total}</span>
                <span>{Math.round((kpi.value / kpi.total) * 100)}%</span>
              </div>
                          </Card>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Performance Metrics</h2>
          <Button className="bg-blue-bright hover:bg-blue-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceCards.map((card, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-navy-dark text-sm">{card.label}</h3>
                <div className={`flex items-center text-sm ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {card.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(card.change)}%
                </div>
              </div>
              <div className="mb-3">
                <span className="text-xl font-semibold text-navy-dark">{card.value}</span>
                <span className="text-lg text-gray-medium">{card.unit}</span>
              </div>
              <div className="text-sm text-gray-medium mb-2">Target: {card.target}{card.unit}</div>
                          </Card>
          ))}
        </div>
      </section>

      {/* Candidate Summary */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-navy-dark mb-2">Candidate Summary</h2>
            <p className="text-gray-medium">
              <span className="font-semibold">1,478</span> candidates selected by{' '}
              <span className="font-semibold">Sarah Chen, Mike Johnson, Lisa Wong</span> and 12 others
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-medium" />
              <span className="text-sm text-gray-medium">Filters:</span>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="september">September</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recruiters</SelectItem>
                <SelectItem value="sarah">Sarah Chen</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="lisa">Lisa Wong</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="tech-corp">TechCorp</SelectItem>
                <SelectItem value="global-inc">Global Inc</SelectItem>
                <SelectItem value="startup-x">Startup X</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CandidateTable 
          selectedKPI={selectedKPI}
          filters={{ month: selectedMonth, recruiter: selectedRecruiter, client: selectedClient }}
        />
      </section>
    </div>
  );
}
