import React from 'react';
import type { UserRole } from '../App';
import { Button } from './ui/button';

type Action = {
  key: string;
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: () => void;
};

interface RoleActionBarProps {
  role: UserRole;
}

// Centralized role-to-actions map. Empty by default; will be populated per user request.
const roleActions: Record<UserRole, Action[]> = {
  recruiter: [],
  teamlead: [],
  manager: [],
  admin: [],
};

export function RoleActionBar({ role }: RoleActionBarProps) {
  const actions = roleActions[role] || [];
  if (!actions.length) return null;

  return (
    <section className="bg-blue-50 rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-3">
        {actions.map((a) => (
          <Button
            key={a.key}
            variant={a.variant ?? 'outline'}
            onClick={a.onClick}
            className={a.variant === 'default' ? 'bg-blue-bright hover:bg-blue-600 text-white' : ''}
          >
            {a.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

export default RoleActionBar;
