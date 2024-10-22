import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { LoginForm } from '@/components/login-form';
import { ICPForm } from '@/components/icp-form';
import { AdminDashboard } from '@/components/admin-dashboard';
import { UserDashboard } from '@/components/user-dashboard';
import { Button } from '@/components/ui/button';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (username: string, password: string) => {
    // Simple mock login logic
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setCurrentUser('admin');
    } else if (username && password) {
      // Allow any non-empty username/password for regular users
      setIsLoggedIn(true);
      setIsAdmin(false);
      setCurrentUser(username);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser('');
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ICP Worksheet </h1>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isLoggedIn && (
              <>
                <span>Welcome, {currentUser}!</span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </header>
        <main className="container mx-auto p-4">
          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : isAdmin ? (
            <AdminDashboard />
          ) : (
            <>
              <UserDashboard username={currentUser} />
              <ICPForm username={currentUser} />
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
