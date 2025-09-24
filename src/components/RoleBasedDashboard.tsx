import React from 'react';
import type { User } from '../App';
import { SharedDashboard } from './SharedDashboard';
import { RoleActionBar, ActionKey } from './RoleActionBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Save } from 'lucide-react';

interface RoleBasedDashboardProps {
  user: User;
  onLogout: () => void;
}

export function RoleBasedDashboard({ user }: RoleBasedDashboardProps) {
  const [open, setOpen] = React.useState<{ [K in ActionKey]?: boolean }>({});
  const [candidateStatus, setCandidateStatus] = React.useState('');

  const handleAction = (key: ActionKey) => setOpen((s) => ({ ...s, [key]: true }));
  const close = (key: ActionKey) => setOpen((s) => ({ ...s, [key]: false }));

  const onSubmit = (key: ActionKey) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = key === 'addCandidate' ? { ...data, status: candidateStatus } : data;
    console.log(`${key} submitted`, payload);
  };

  return (
    <div className="space-y-6">
      <RoleActionBar role={user.role} onAction={handleAction} />
      <SharedDashboard />

      {/* Add Candidate */}
      <Dialog open={!!open.addCandidate} onOpenChange={(v) => !v && close('addCandidate')}>
        <DialogContent className="sm:max-w-xl p-4 max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-navy-dark">Add Candidate</DialogTitle>
            <DialogDescription>Enter candidate details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit('addCandidate')} className="space-y-3">
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

      {/* Add Recruiter */}
      <Dialog open={!!open.addRecruiter} onOpenChange={(v) => !v && close('addRecruiter')}>
        <DialogContent className="sm:max-w-xl p-4 max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-navy-dark">Add Recruiter</DialogTitle>
            <DialogDescription>Enter recruiter details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit('addRecruiter')} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="recruiter-name">Full Name</Label>
                <Input id="recruiter-name" name="fullName" required className="h-8" />
              </div>
              <div>
                <Label htmlFor="recruiter-email">Email</Label>
                <Input id="recruiter-email" name="email" type="email" required className="h-8" />
              </div>
              <div>
                <Label htmlFor="recruiter-contact">Contact Number</Label>
                <Input id="recruiter-contact" name="contactNumber" className="h-8" />
              </div>
              <div>
                <Label htmlFor="recruiter-role">Role</Label>
                <Input id="recruiter-role" name="role" placeholder="Recruiter / Senior Recruiter / Team Lead" className="h-8" />
              </div>
              <div>
                <Label htmlFor="recruiter-team">Team</Label>
                <Input id="recruiter-team" name="team" className="h-8" />
              </div>
              <div>
                <Label htmlFor="recruiter-joining">Joining Date</Label>
                <Input id="recruiter-joining" name="joiningDate" type="date" className="h-8" />
              </div>
              <div>
                <Label htmlFor="recruiter-exp">Experience (years)</Label>
                <Input id="recruiter-exp" name="experienceYears" type="number" min={0} step="0.1" className="h-8" />
              </div>
              <div>
                <Label htmlFor="recruiter-location">Location</Label>
                <Input id="recruiter-location" name="location" className="h-8" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="recruiter-notes">Notes</Label>
                <Textarea id="recruiter-notes" name="notes" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Recruiter
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Client */}
      <Dialog open={!!open.addClient} onOpenChange={(v) => !v && close('addClient')}>
        <DialogContent className="sm:max-w-xl p-4 max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-navy-dark">Add Client</DialogTitle>
            <DialogDescription>Enter client details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit('addClient')} className="space-y-3">
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

      {/* Add Closure */}
      <Dialog open={!!open.addClosure} onOpenChange={(v) => !v && close('addClosure')}>
        <DialogContent className="sm:max-w-xl p-4 max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-navy-dark">Add Closure</DialogTitle>
            <DialogDescription>Enter closure details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit('addClosure')} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="closure-candidate">Candidate Name</Label>
                <Input id="closure-candidate" name="candidateName" required className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-client">Client</Label>
                <Input id="closure-client" name="client" className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-position">Position</Label>
                <Input id="closure-position" name="position" className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-doj">Date of Joining</Label>
                <Input id="closure-doj" name="dateOfJoining" type="date" className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-salary">Salary</Label>
                <Input id="closure-salary" name="salary" type="number" min={0} className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-recruiter">Recruiter</Label>
                <Input id="closure-recruiter" name="recruiter" className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-lead">Team Lead</Label>
                <Input id="closure-lead" name="teamLead" className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-manager">Manager</Label>
                <Input id="closure-manager" name="manager" className="h-8" />
              </div>
              <div>
                <Label htmlFor="closure-arpu">ARPU</Label>
                <Input id="closure-arpu" name="arpu" type="number" min={0} step="0.01" className="h-8" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="closure-notes">Notes</Label>
                <Textarea id="closure-notes" name="notes" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" className="bg-blue-bright hover:bg-blue-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Closure
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RoleBasedDashboard;
