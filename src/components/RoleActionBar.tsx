import React from 'react';
import type { UserRole } from '../App';
import { Button } from './ui/button';

export type ActionKey = 'addCandidate' | 'addRecruiter' | 'addClient' | 'addClosure';

interface RoleActionBarProps {
  role: UserRole;
  onAction: (key: ActionKey) => void;
}

const actionLabels: Record<ActionKey, string> = {
  addCandidate: 'Add Candidate',
  addRecruiter: 'Add Recruiter',
  addClient: 'Add Client',
  addClosure: 'Add Closure',
};

const roleActionKeys: Record<UserRole, ActionKey[]> = {
  recruiter: [],
  teamlead: ['addCandidate', 'addRecruiter'],
  manager: ['addCandidate', 'addRecruiter', 'addClient'],
  admin: ['addCandidate', 'addRecruiter', 'addClient', 'addClosure'],
};

export function RoleActionBar({ role, onAction }: RoleActionBarProps) {
  const keys = roleActionKeys[role] || [];
  if (!keys.length) return null;

  return (
    <section className="bg-blue-50 rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-3">
        {keys.map((key) => (
          <Button
            key={key}
            onClick={() => onAction(key)}
            className="bg-blue-bright hover:bg-blue-600 text-white"
          >
            {actionLabels[key]}
          </Button>
        ))}
      </div>
    </section>
  );
}

export default RoleActionBar;
