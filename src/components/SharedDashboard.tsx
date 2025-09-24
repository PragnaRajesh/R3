import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Filter,
  UserPlus,
  Building2,
  Save
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { CandidateTable } from './CandidateTable';
import ClientRecruiterMatrix from './ClientRecruiterMatrix';

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
  const [candidateStatus, setCandidateStatus] = useState('');

  const handleCandidateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, status: candidateStatus };
    console.log('New candidate submitted', payload);
  };

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('New client submitted', data);
  };

  return (
    <div className="space-y-8">
      {/* Recruiter KPIs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-navy-dark">Recruiter KPIs</h2>
          <Button className="bg-blue-bright hover:bg-blue-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
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


      {/* Client vs Recruiter Matrix */}
      <ClientRecruiterMatrix />

      {/* Candidate Summary */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-navy-dark mb-2">Candidate Summary</h2>
            <p className="text-gray-medium" />
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

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-bright hover:bg-blue-600 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Candidate
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl p-4 max-h-[85dvh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-navy-dark">Add Candidate</DialogTitle>
                    <DialogDescription>Enter candidate details below.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCandidateSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="candidate-name">Full Name</Label>
                        <Input id="candidate-name" name="fullName" required className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-email">Email</Label>
                        <Input id="candidate-email" name="email" type="email" required className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-contact">Contact Number</Label>
                        <Input id="candidate-contact" name="contactNumber" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-position">Position</Label>
                        <Input id="candidate-position" name="position" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-location">Location</Label>
                        <Input id="candidate-location" name="location" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-client">Client</Label>
                        <Input id="candidate-client" name="client" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-status">Status</Label>
                        <Select value={candidateStatus} onValueChange={setCandidateStatus}>
                          <SelectTrigger id="candidate-status" className="h-8">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prospect">Prospect</SelectItem>
                            <SelectItem value="interviewing">Interviewing</SelectItem>
                            <SelectItem value="selected">Selected</SelectItem>
                            <SelectItem value="joined">Joined</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="candidate-doj">Date of Joining</Label>
                        <Input id="candidate-doj" name="dateOfJoining" type="date" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-salary">Salary</Label>
                        <Input id="candidate-salary" name="salary" type="number" min={0} className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-recruiter">Recruiter Reporting</Label>
                        <Input id="candidate-recruiter" name="recruiterReporting" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-lead">Team Lead Reporting</Label>
                        <Input id="candidate-lead" name="teamLeadReporting" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-manager">Manager</Label>
                        <Input id="candidate-manager" name="manager" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="candidate-arpu">ARPU</Label>
                        <Input id="candidate-arpu" name="arpu" type="number" min={0} step="0.01" className="h-8" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="candidate-additional">Additional Info</Label>
                        <Textarea id="candidate-additional" name="additionalInfo" rows={3} />
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
                <DialogContent className="sm:max-w-xl p-4 max-h-[85dvh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-navy-dark">Add Client</DialogTitle>
                    <DialogDescription>Enter client details below.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleClientSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="client-name">Client Name</Label>
                        <Input id="client-name" name="clientName" required className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="client-spoc">SPOC</Label>
                        <Input id="client-spoc" name="spoc" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="client-email">Contact Email</Label>
                        <Input id="client-email" name="contactEmail" type="email" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="client-arpu">ARPU</Label>
                        <Input id="client-arpu" name="arpu" type="number" min={0} step="0.01" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="client-position">Position</Label>
                        <Input id="client-position" name="position" className="h-8" />
                      </div>
                      <div>
                        <Label htmlFor="client-positions">Number of Positions</Label>
                        <Input id="client-positions" name="numberOfPositions" type="number" min={0} className="h-8" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="client-additional">Additional Information</Label>
                        <Textarea id="client-additional" name="additionalInformation" rows={3} />
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
            </div>
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
