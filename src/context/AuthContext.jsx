
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('busToken');
    const storedUser = localStorage.getItem('busUser');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll use mock data
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', walletBalance: 1000 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123', walletBalance: 1500 }
      ];
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Create a mock JWT token (in real app, this would come from your backend)
      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      
      // Store in localStorage
      localStorage.setItem('busToken', token);
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('busUser', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      return userWithoutPassword;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('busToken');
    localStorage.removeItem('busUser');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  const updateWalletBalance = (newBalance) => {
    if (user) {
      const updatedUser = { ...user, walletBalance: newBalance };
      localStorage.setItem('busUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateWalletBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
