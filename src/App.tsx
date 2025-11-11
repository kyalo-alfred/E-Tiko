import { useState, useEffect } from 'react';
import { authApi } from './lib/api';
import type { User } from './lib/api';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { PasswordReset } from './components/PasswordReset';
import { AttendeeDashboard } from './components/AttendeeDashboard';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { LogOut, Ticket } from 'lucide-react';

type AuthView = 'login' | 'register' | 'reset';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleAuthSuccess = () => {
    const currentUser = authApi.getCurrentUser();
    setUser(currentUser);
    setAuthView('login');
  };

  const handleLogout = async () => {
    await authApi.logout();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <Toaster />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary rounded-xl">
                <Ticket className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-primary">E-Tiko</h1>
                <p className="text-sm text-muted-foreground">
                  Event Ticketing & Reservation System
                </p>
              </div>
            </div>

            {authView === 'login' && (
              <Login
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={() => setAuthView('register')}
                onSwitchToReset={() => setAuthView('reset')}
              />
            )}
            {authView === 'register' && (
              <Register
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setAuthView('login')}
              />
            )}
            {authView === 'reset' && (
              <PasswordReset
                onSuccess={() => setAuthView('login')}
                onBack={() => setAuthView('login')}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Ticket className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2>E-Tiko</h2>
                <p className="text-xs text-muted-foreground">
                  {user.role === 'organizer' ? 'Organizer Portal' : 'Attendee Portal'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {user.role === 'organizer' ? (
          <OrganizerDashboard user={user} />
        ) : (
          <AttendeeDashboard user={user} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 E-Tiko - Event Ticketing & Reservation System</p>
            <p className="mt-1">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
