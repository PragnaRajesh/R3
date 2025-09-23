import { useState } from 'react';
import { User } from '../App';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  UserCheck,
  Clock,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle,
  UserX,
  Calendar,
  UserPlus,
  Building2,
  Save
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ClientRecruiterMatrix from './ClientRecruiterMatrix';

interface TeamLeadDashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data for Team Lead specific metrics
const teamMembersData = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Recruiter', selections: 23, target: 25, performance: 92, status: 'active' },
  { id: 2, name: 'Mike Johnson', role: 'Recruiter', selections: 19, target: 20, performance: 95, status: 'active' },
  { id: 3, name: 'Lisa Wong', role: 'Senior Recruiter', selections: 21, target: 22, performance: 95, status: 'active' },
  { id: 4, name: 'David Kumar', role: 'Recruiter', selections: 18, target: 20, performance: 90, status: 'active' },
  { id: 5, name: 'Emma Davis', role: 'Junior Recruiter', selections: 12, target: 15, performance: 80, status: 'training' },
  { id: 6, name: 'James Wilson', role: 'Recruiter', selections: 16, target: 18, performance: 89, status: 'active' }
];

const teamPerformanceData = [
  { month: 'Jul', target: 100, achieved: 95, efficiency: 89 },
  { month: 'Aug', target: 110, achieved: 108, efficiency: 92 },
  { month: 'Sep', target: 120, achieved: 115, efficiency: 91 },
  { month: 'Oct', target: 125, achieved: 122, efficiency: 94 },
  { month: 'Nov', target: 130, achieved: 128, efficiency: 96 },
  { month: 'Dec', target: 135, achieved: 142, efficiency: 98 }
];

const teamLeadKpis = [
  { label: 'Team Utilization', value: 94, target: 90, color: 'bg-green-500', trend: 'up', change: 4.2 },
  { label: 'Quality Score', value: 89, target: 85, color: 'bg-blue-500', trend: 'up', change: 2.1 },
  { label: 'Training Hours', value: 42, target: 40, color: 'bg-purple-500', trend: 'up', change: 5.0 },
  { label: 'Team Satisfaction', value: 4.2, target: 4.0, color: 'bg-yellow-500', trend: 'up', change: 0.3 }
];

const workloadDistribution = [
  { name: 'Blue Collar', value: 28, color: '#1A4DFF' },
  { name: 'IT', value: 24, color: '#B5D7FF' },
  { name: 'Sales', value: 18, color: '#D9EBFF' },
  { name: 'Operations', value: 15, color: '#0A1F44' },
  { name: 'Others', value: 15, color: '#6B7280' }
];

export function TeamLeadDashboard({ user }: TeamLeadDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');
  const [candidateDepartment, setCandidateDepartment] = useState('');

  const handleCandidateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, department: candidateDepartment };
    // Replace with API call or state update as needed
    console.log('New candidate submitted', payload);
  };

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Replace with API call or state update as needed
    console.log('New client submitted', data);
  };

  return (
    <div className="p-6 space-y-8">

      {/* Team Overview Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-navy-dark mb-6">Team Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Team Members</h3>
              <Users className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">12</p>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              2 new this month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Total Selections</h3>
              <Target className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">1,247</p>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              8.5% vs last month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Team Target</h3>
              <Award className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">98%</p>
            <Badge className="bg-green-100 text-green-800">Exceeded</Badge>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-dark">Avg Performance</h3>
              <BarChart3 className="w-5 h-5 text-blue-bright" />
            </div>
            <p className="text-2xl font-semibold text-navy-dark mb-2">91%</p>
            <Badge className="bg-blue-100 text-blue-800">Excellent</Badge>
          </Card>
        </div>
      </section>

      {/* Team Lead KPIs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Leadership KPIs</h2>
          <Button className="bg-blue-bright hover:bg-blue-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamLeadKpis.map((kpi, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-dark text-sm">{kpi.label}</h3>
                <div className={`flex items-center text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {kpi.change}%
                </div>
              </div>
              <p className="text-2xl font-semibold text-navy-dark mb-2">
                {kpi.value}{kpi.label === 'Team Satisfaction' ? '/5' : '%'}
              </p>
              <div className="text-sm text-gray-medium mb-3">
                Target: {kpi.target}{kpi.label === 'Team Satisfaction' ? '/5' : '%'}
              </div>
              <Progress 
                value={(kpi.value / kpi.target) * 100} 
                className="h-2"
              />
            </Card>
          ))}
        </div>
      </section>

      {/* Team Performance and Member Management */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-navy-dark">Team Performance Trend</h3>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamPerformanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="target" stroke="#6B7280" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="achieved" stroke="#1A4DFF" strokeWidth={2} />
                  <Line type="monotone" dataKey="efficiency" stroke="#B5D7FF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Workload Distribution */}
          <Card className="p-6">
            <h3 className="font-semibold text-navy-dark mb-6">Team Workload Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workloadDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {workloadDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      {/* Client vs Recruiter Matrix */}
      <ClientRecruiterMatrix />

      {/* Team Members Management */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Team Members</h2>
          <div className="flex items-center gap-4">
            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="training">In Training</SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-bright hover:bg-blue-600 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Candidate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-navy-dark">Add Candidate</DialogTitle>
                  <DialogDescription>Enter candidate details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCandidateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="candidate-name">Full Name</Label>
                      <Input id="candidate-name" name="fullName" required />
                    </div>
                    <div>
                      <Label htmlFor="candidate-email">Email</Label>
                      <Input id="candidate-email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="candidate-phone">Phone</Label>
                      <Input id="candidate-phone" name="phone" />
                    </div>
                    <div>
                      <Label htmlFor="candidate-dept">Department</Label>
                      <Select value={candidateDepartment} onValueChange={setCandidateDepartment}>
                        <SelectTrigger id="candidate-dept">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue-collar">Blue Collar</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="candidate-experience">Experience (years)</Label>
                      <Input id="candidate-experience" name="experienceYears" type="number" min={0} />
                    </div>
                    <div>
                      <Label htmlFor="candidate-availability">Availability</Label>
                      <Input id="candidate-availability" name="availabilityDate" type="date" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="candidate-skills">Skills</Label>
                      <Textarea id="candidate-skills" name="skills" rows={3} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="candidate-notes">Notes</Label>
                      <Textarea id="candidate-notes" name="notes" rows={3} />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save Candidate
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-bright hover:bg-blue-600 text-white">
                  <Building2 className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-navy-dark">Add Client</DialogTitle>
                  <DialogDescription>Enter client details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client-name">Company Name</Label>
                      <Input id="client-name" name="companyName" required />
                    </div>
                    <div>
                      <Label htmlFor="client-industry">Industry</Label>
                      <Input id="client-industry" name="industry" />
                    </div>
                    <div>
                      <Label htmlFor="client-contact">Contact Person</Label>
                      <Input id="client-contact" name="contactName" />
                    </div>
                    <div>
                      <Label htmlFor="client-email">Email</Label>
                      <Input id="client-email" name="email" type="email" />
                    </div>
                    <div>
                      <Label htmlFor="client-phone">Phone</Label>
                      <Input id="client-phone" name="phone" />
                    </div>
                    <div>
                      <Label htmlFor="client-location">Location</Label>
                      <Input id="client-location" name="location" />
                    </div>
                    <div>
                      <Label htmlFor="client-openings">Open Roles</Label>
                      <Input id="client-openings" name="openings" type="number" min={0} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="client-notes">Notes</Label>
                      <Textarea id="client-notes" name="notes" rows={3} />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save Client
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button className="bg-blue-bright hover:bg-blue-600 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Team Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembersData.map((member) => (
            <Card key={member.id} className="p-6 hover:shadow-lg transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-bright text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-navy-dark">{member.name}</h3>
                    <p className="text-sm text-gray-medium">{member.role}</p>
                  </div>
                </div>
                <Badge className={
                  member.status === 'active' ? 'bg-green-100 text-green-800' :
                  member.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {member.status === 'active' ? 'Active' : 
                   member.status === 'training' ? 'Training' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-medium">Performance</span>
                    <span className="font-semibold text-navy-dark">{member.performance}%</span>
                  </div>
                  <Progress value={member.performance} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-medium">Target Progress</span>
                    <span className="font-semibold text-navy-dark">
                      {member.selections}/{member.target}
                    </span>
                  </div>
                  <Progress value={(member.selections / member.target) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm">
                    {member.performance >= 90 ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    ) : member.performance >= 80 ? (
                      <Clock className="w-4 h-4 text-yellow-600 mr-1" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={
                      member.performance >= 90 ? 'text-green-600' :
                      member.performance >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }>
                      {member.performance >= 90 ? 'Excellent' :
                       member.performance >= 80 ? 'Good' : 'Needs Support'}
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserCheck className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
