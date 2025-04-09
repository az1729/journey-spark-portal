
import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "@/components/ui/use-toast";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user, updateWalletBalance } = useAuth();
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  // Mock bus data
  const [buses, setBuses] = useState([
    {
      id: 1,
      busNumber: 'BUS001',
      source: 'New York',
      destination: 'Boston',
      date: '2025-04-15',
      departureTime: '08:00 AM',
      arrivalTime: '12:30 PM',
      totalSeats: 40,
      availableSeats: 28,
      seatPrice: 35,
      seatLayout: Array(40).fill().map((_, index) => ({
        id: index + 1,
        status: Math.random() > 0.7 ? 'booked' : 'available' // Randomly assign 30% of seats as booked
      }))
    },
    {
      id: 2,
      busNumber: 'BUS002',
      source: 'Boston',
      destination: 'Washington DC',
      date: '2025-04-15',
      departureTime: '10:00 AM',
      arrivalTime: '03:45 PM',
      totalSeats: 40,
      availableSeats: 15,
      seatPrice: 45,
      seatLayout: Array(40).fill().map((_, index) => ({
        id: index + 1,
        status: Math.random() > 0.6 ? 'booked' : 'available' // Randomly assign 40% of seats as booked
      }))
    },
    {
      id: 3,
      busNumber: 'BUS003',
      source: 'Washington DC',
      destination: 'Philadelphia',
      date: '2025-04-15',
      departureTime: '02:30 PM',
      arrivalTime: '06:00 PM',
      totalSeats: 40,
      availableSeats: 32,
      seatPrice: 30,
      seatLayout: Array(40).fill().map((_, index) => ({
        id: index + 1,
        status: Math.random() > 0.8 ? 'booked' : 'available' // Randomly assign 20% of seats as booked
      }))
    },
    {
      id: 4,
      busNumber: 'BUS004',
      source: 'Philadelphia',
      destination: 'New York',
      date: '2025-04-15',
      departureTime: '07:00 PM',
      arrivalTime: '11:00 PM',
      totalSeats: 40,
      availableSeats: 20,
      seatPrice: 35,
      seatLayout: Array(40).fill().map((_, index) => ({
        id: index + 1,
        status: Math.random() > 0.5 ? 'booked' : 'available' // Randomly assign 50% of seats as booked
      }))
    },
  ]);

  const selectBus = (bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
  };

  const toggleSeatSelection = (seatId) => {
    if (!selectedBus) return;

    const seat = selectedBus.seatLayout.find(s => s.id === seatId);

    // If seat is booked, do nothing
    if (seat.status === 'booked') return;

    if (selectedSeats.includes(seatId)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getTotalFare = () => {
    if (!selectedBus) return 0;
    return selectedSeats.length * selectedBus.seatPrice;
  };

  const confirmBooking = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "You must be logged in to book tickets.",
        variant: "destructive",
      });
      return false;
    }

    if (selectedSeats.length === 0) {
      toast({
        title: "No Seats Selected",
        description: "Please select at least one seat to proceed.",
        variant: "destructive",
      });
      return false;
    }

    const totalFare = getTotalFare();
    
    if (user.walletBalance < totalFare) {
      toast({
        title: "Insufficient Balance",
        description: `You need ₹${totalFare} for this booking, but your wallet only has ₹${user.walletBalance}.`,
        variant: "destructive",
      });
      return false;
    }

    // Update bus and seat status
    const updatedBus = { ...selectedBus };
    updatedBus.availableSeats -= selectedSeats.length;
    updatedBus.seatLayout = updatedBus.seatLayout.map(seat => {
      if (selectedSeats.includes(seat.id)) {
        return { ...seat, status: 'booked' };
      }
      return seat;
    });

    // Update buses array
    setBuses(prevBuses => prevBuses.map(bus => 
      bus.id === updatedBus.id ? updatedBus : bus
    ));

    // Create booking record
    const booking = {
      id: Date.now(),
      busId: selectedBus.id,
      busNumber: selectedBus.busNumber,
      source: selectedBus.source,
      destination: selectedBus.destination,
      date: selectedBus.date,
      departureTime: selectedBus.departureTime,
      seats: selectedSeats,
      totalFare,
      bookingDate: new Date().toISOString()
    };

    // Add to bookings
    setBookings([booking, ...bookings]);

    // Deduct from wallet
    const newBalance = user.walletBalance - totalFare;
    updateWalletBalance(newBalance);

    // Reset selection
    setSelectedBus(null);
    setSelectedSeats([]);

    toast({
      title: "Booking Confirmed",
      description: `Successfully booked ${selectedSeats.length} seats for ${selectedBus.source} to ${selectedBus.destination}. Total fare: ₹${totalFare}`,
    });

    return true;
  };

  return (
    <BookingContext.Provider value={{
      buses,
      bookings,
      selectedBus,
      selectedSeats,
      selectBus,
      toggleSeatSelection,
      getTotalFare,
      confirmBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
