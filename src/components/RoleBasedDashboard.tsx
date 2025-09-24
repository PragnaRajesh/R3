import React from 'react';
import type { User } from '../App';
import { SharedDashboard } from './SharedDashboard';
import { RoleActionBar } from './RoleActionBar';

interface RoleBasedDashboardProps {
  user: User;
  onLogout: () => void;
}

export function RoleBasedDashboard({ user }: RoleBasedDashboardProps) {
  return (
    <div className="space-y-6">
      <RoleActionBar role={user.role} />
      <SharedDashboard />
    </div>
  );
}

export default RoleBasedDashboard;
