import React from 'react';
import { Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none"></div>
      <Card className="relative z-10 w-full max-w-md mx-auto overflow-hidden border-none shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 opacity-90"></div>
        <CardHeader className="relative z-20 px-6 pt-6 pb-0">
          <div className="flex justify-center mb-4">
            <Shield className="text-primary w-20 h-20 stroke-[1.5] opacity-80" />
          </div>
        </CardHeader>
        <CardContent className="relative z-20 p-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Access Restricted
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-6">
            You do not have permission to view this page. 
            This area requires authentication to ensure the security of sensitive information.
          </p>
          <Button 
            onClick={handleLogin} 
            className="w-full bg-primary/90 hover:bg-primary transition-all duration-300 ease-in-out group"
          >
            <div className="flex items-center justify-center space-x-2">
              <LogIn className="w-5 h-5 group-hover:animate-pulse" />
              <span>Proceed to Login</span>
            </div>
          </Button>
        </CardContent>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;