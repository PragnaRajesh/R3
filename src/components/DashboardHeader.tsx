import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Home, LayoutDashboard, Bell, Calendar, LogOut, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('dashboard');
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mockReminders = [
    { id: 1, text: 'Team standup at 10:00 AM', priority: 'high' },
    { id: 2, text: 'Review Q4 hiring targets', priority: 'medium' },
    { id: 3, text: 'Interview feedback due by EOD', priority: 'high' },
    { id: 4, text: 'Monthly report submission', priority: 'low' }
  ];

  const roleDisplayNames = {
    recruiter: 'Recruiter',
    teamlead: 'Team Lead', 
    manager: 'Manager',
    admin: 'Admin'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-soft">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: App Name & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-bright rounded-lg flex items-center justify-center shadow-soft">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-navy-dark">
              HeadsUp HR
            </h1>
            <p className="text-sm text-gray-medium">
              {roleDisplayNames[user.role]} Portal
            </p>
          </div>
        </div>

        {/* Center: Navigation Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('home')}
            className={`${
              activeTab === 'home' 
                ? 'bg-white shadow-sm text-navy-dark' 
                : 'text-gray-medium hover:text-navy-dark'
            }`}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('dashboard')}
            className={`${
              activeTab === 'dashboard' 
                ? 'bg-white shadow-sm text-navy-dark' 
                : 'text-gray-medium hover:text-navy-dark'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>

        {/* Right: Date & Reminders */}
        <div className="flex items-center space-x-4">
          {/* Date */}
          <div className="hidden md:flex items-center text-sm text-gray-medium">
            <Calendar className="w-4 h-4 mr-2" />
            {currentDate}
          </div>

          {/* Reminders Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Reminders
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center rounded-full">
                    {mockReminders.filter(r => r.priority === 'high').length}
                  </Badge>
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="p-3 border-b">
                <h3 className="font-semibold text-navy-dark">Today's Reminders</h3>
              </div>
              {mockReminders.map((reminder, index) => (
                <DropdownMenuItem key={reminder.id} className="p-3 flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    reminder.priority === 'high' ? 'bg-red-500' :
                    reminder.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-navy-dark">{reminder.text}</p>
                    <p className="text-xs text-gray-medium capitalize">{reminder.priority} priority</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 text-center text-blue-bright">
                View all reminders
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button variant="outline" size="sm">
                  <div className="w-6 h-6 bg-blue-bright rounded-full flex items-center justify-center text-white text-xs mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-3 border-b">
                <p className="font-semibold text-navy-dark">{user.name}</p>
                <p className="text-sm text-gray-medium">{user.email}</p>
              </div>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}