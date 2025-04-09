
import React from 'react';
import { useBooking } from '@/context/BookingContext';

const SeatLayout = () => {
  const { selectedBus, selectedSeats, toggleSeatSelection } = useBooking();

  if (!selectedBus) return null;

  // Create a 10x4 grid (40 seats)
  const rows = 10;
  const seatsPerRow = 4;

  const renderSeat = (seatId) => {
    const seat = selectedBus.seatLayout.find(s => s.id === seatId);
    if (!seat) return null;

    let statusClass = 'available';
    if (seat.status === 'booked') {
      statusClass = 'booked';
    } else if (selectedSeats.includes(seatId)) {
      statusClass = 'selected';
    }

    return (
      <div 
        key={seatId} 
        className={`bus-seat ${statusClass}`}
        onClick={() => toggleSeatSelection(seatId)}
      >
        {seatId}
      </div>
    );
  };

  // Generate grid
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatId = row * seatsPerRow + col + 1;
        
        // Add seat to row
        rowSeats.push(renderSeat(seatId));
        
        // Add center aisle after 2nd seat
        if (col === 1) {
          rowSeats.push(<div key={`aisle-${row}`} className="w-8"></div>);
        }
      }
      grid.push(
        <div key={`row-${row}`} className="flex justify-center gap-2 mb-2">
          {rowSeats}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="my-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center mb-4">Select Your Seats</h3>
          
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="bus-seat available w-6 h-6"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bus-seat selected w-6 h-6"></div>
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bus-seat booked w-6 h-6"></div>
              <span className="text-sm">Booked</span>
            </div>
          </div>
          
          <div className="border-t border-b py-4 mb-4">
            <div className="bg-gray-200 p-2 rounded-t-lg text-center font-medium mb-4">
              FRONT
            </div>
            {renderGrid()}
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            Click on a seat to select or deselect it
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Selected Seats:</div>
              <div className="font-medium">
                {selectedSeats.length > 0 
                  ? selectedSeats.sort((a, b) => a - b).join(', ') 
                  : 'None'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Fare:</div>
              <div className="text-xl font-bold text-bus-primary">
                ${selectedBus.seatPrice * selectedSeats.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
