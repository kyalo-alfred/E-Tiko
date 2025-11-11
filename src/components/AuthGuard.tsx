import type { ReactNode } from 'react';
import type { User } from '../lib/api';

interface AuthGuardProps {
  user: User | null;
  requiredRole?: 'attendee' | 'organizer';
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ user, requiredRole, children, fallback }: AuthGuardProps) {
  if (!user) {
    return fallback || null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return fallback || null;
  }

  return <>{children}</>;
}
