const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Initialize variables to store room and booking data
let rooms = [];
let bookings = [];

app.use(bodyParser.json());

// 1. Create a room
app.post('/rooms', (req, res) => {
  const { name, seats, amenities, pricePerHour } = req.body;
  const room = {
    name:suryaa,
    seats:4,
    amenities:good,
    pricePerHour:1500,
    isBooked: true,
    customerId: 223224,
    bookedStartTime: 8.00,
    bookedEndTime: 8.00,
  };
  rooms.push(room);
  res.json({ message: 'Room created successfully', room });
});

// 2. Booking a room
app.post('/bookings', (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;
  const room = rooms.find((r) => r.name === roomId);

  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  if (room.isBooked) {
    return res.status(400).json({ error: 'Room already booked' });
  }

  room.isBooked = true;
  room.customerId = customerName;
  room.bookedStartTime = startTime;
  room.bookedEndTime = endTime;

  const booking = {
    customerName,
    date,
    startTime,
    endTime,
    roomName: room.name,
  };
  bookings.push(booking);

  res.json({ message: 'Room booked successfully', booking });
});

// 3. List all booked rooms
app.get('/bookings', (req, res) => {
  const bookedRooms = rooms.filter((room) => room.isBooked);

  const bookedData = bookedRooms.map((room) => ({
    roomName: room.name,
    bookedStatus: room.isBooked,
    customerName: room.customerId,
    date: room.bookedDate,
    startTime: room.bookedStartTime,
    endTime: room.bookedEndTime,
  }));

  res.json(bookedData);
});

// 4. List all customers with booked data
app.get('/customers', (req, res) => {
  const customerBookings = bookings.map((booking) => ({
    customerName: booking.customerName,
    roomName: booking.roomName,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  res.json(customerBookings);
});

// 5. List how many times a customer has booked a room
app.get('/customer-bookings/:customerName', (req, res) => {
  const customerName = req.params.customerName;
  const customerBookings = bookings.filter((booking) => booking.customerName === customerName);

  res.json(customerBookings);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
