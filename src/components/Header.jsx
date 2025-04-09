
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Ticket, Wallet, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-bus-primary">
          <span className="flex items-center gap-2">
            Journey<span className="text-bus-secondary">Spark</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <Wallet className="w-4 h-4" />
                <span>Wallet: <span className="font-semibold">${user.walletBalance.toFixed(2)}</span></span>
              </div>
              
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600">Hello, {user.name}</span>
                <div className="w-8 h-8 bg-bus-primary text-white rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>

              <Link to="/my-bookings">
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                  <Ticket className="w-4 h-4" />
                  <span>My Bookings</span>
                </Button>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600">
                <LogOut className="w-4 h-4 md:mr-1" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              className="bg-bus-primary hover:bg-bus-primary/90"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
