import { useEffect, useState } from 'react';


/*
=========================================
TRAVELOOP COMPLETE FULL STACK GUIDE
=========================================

INSTALL FRONTEND:
npm create vite@latest traveloop -- --template react
cd traveloop
npm install
npm install tailwindcss @tailwindcss/vite

INSTALL BACKEND:
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv

=========================================
FILE: vite.config.js
=========================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

=========================================
FILE: src/index.css
=========================================

@import "tailwindcss";

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #050816;
}

=========================================
FILE: backend/server.js
=========================================

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err))

const TripSchema = new mongoose.Schema({
  name: String,
  location: String,
  dates: String,
  budget: String,
  image: String,
})

const Trip = mongoose.model('Trip', TripSchema)

app.get('/api/trips', async (req, res) => {
  const trips = await Trip.find()
  res.json(trips)
})

app.post('/api/trips', async (req, res) => {
  const trip = await Trip.create(req.body)
  res.json(trip)
})

app.delete('/api/trips/:id', async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id)
  res.json({ message: 'Trip Deleted' })
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})

=========================================
FILE: backend/.env
=========================================

MONGO_URI=your_mongodb_connection_string

=========================================
RUN FRONTEND
=========================================
npm run dev

=========================================
RUN BACKEND
=========================================
cd backend
node server.js

=========================================
FINAL URLS
=========================================
Frontend:
http://localhost:5173

Backend:
http://localhost:5000

=========================================
END GUIDE
=========================================
*/

export default function TravelLoopApp() {
  const [checklist, setChecklist] = useState([
    { item: 'Passport', checked: true },
    { item: 'Power Bank', checked: false },
    { item: 'Tickets', checked: true },
    { item: 'Clothes', checked: false },
  ]);

  const [trips, setTrips] = useState([

    {
      id: 1,
      name: 'Bali Summer Escape',
      location: 'Indonesia',
      dates: '12 Jun - 18 Jun',
      budget: '₹72,000',
      image:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Swiss Alps Adventure',
      location: 'Switzerland',
      dates: '2 Jul - 10 Jul',
      budget: '₹1,45,000',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    },
  ]);

  const [tripForm, setTripForm] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
  fetch('http://localhost:5000/api/trips')
    .then((res) => res.json())
    .then((data) => setTrips(data))
    .catch((err) => console.log(err));
}, []);

 const createTrip = async () => {
  if (!tripForm.name || !tripForm.destination) {
    alert('Please fill all fields');
    return;
  }

  const newTrip = {
    name: tripForm.name,
    location: tripForm.destination,
    dates: `${tripForm.startDate} - ${tripForm.endDate}`,
    budget: '₹50,000',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  };

  try {
    const response = await fetch('http://localhost:5000/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip),
    });

    const savedTrip = await response.json();

    setTrips((prev) => [savedTrip, ...prev]);

    setTripForm({
      name: '',
      destination: '',
      startDate: '',
      endDate: '',
      description: '',
    });

    alert('Trip Created Successfully');
  } catch (error) {
    console.log(error);
    alert('Error creating trip');
  }
};
  const deleteTrip = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/trips/${id}`, {
      method: 'DELETE',
    });

    setTrips((prev) => prev.filter((trip) => trip._id !== id));
  } catch (error) {
    console.log(error);
  }
};

  const destinations = [
    'Tokyo',
    'Dubai',
    'Paris',
    'Singapore',
    'Goa',
    'Manali',
  ];

  const activities = [
    {
      title: 'Beach Party Cruise',
      city: 'Bali',
      duration: '3 Hours',
      price: '₹4,500',
    },
    {
      title: 'Sky Diving',
      city: 'Dubai',
      duration: '2 Hours',
      price: '₹18,000',
    },
    {
      title: 'Mountain Hiking',
      city: 'Swiss Alps',
      duration: '6 Hours',
      price: '₹7,200',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7c3aed22,transparent_35%),radial-gradient(circle_at_bottom_left,#2563eb22,transparent_35%)]" />

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-2xl">
              ✈️
            </div>
            <h1 className="text-3xl font-black tracking-tight">Traveloop</h1>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#dashboard" className="hover:text-white">Dashboard</a>
            <a href="#discover" className="hover:text-white">Discover</a>
            <a href="#planner" className="hover:text-white">Planner</a>
            <a href="#budget" className="hover:text-white">Budget</a>
            <a href="#journal" className="hover:text-white">Journal</a>
          </nav>

          <button className="bg-white text-black px-5 py-2 rounded-2xl font-semibold hover:scale-105 transition">
            Login
          </button>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-indigo-200 mb-6">
            ✨
            AI Powered Travel Planning Platform
          </div>

          <h2 className="text-6xl leading-tight font-black">
            Design Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {' '}Dream Journey
            </span>
          </h2>

          <p className="mt-8 text-lg text-gray-300 leading-8 max-w-xl">
            Create intelligent itineraries, manage budgets, discover attractions,
            organize packing lists, and share trips with friends — all from one
            futuristic travel dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-7 py-4 rounded-2xl font-semibold flex items-center gap-2 transition">
              ➕
              Start Planning
            </button>

            <button className="border border-white/20 hover:bg-white/10 px-7 py-4 rounded-2xl font-semibold transition">
              Explore Trips
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-14">
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
              <p className="text-4xl font-black">120+</p>
              <span className="text-gray-400 text-sm">Destinations</span>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
              <p className="text-4xl font-black">8K+</p>
              <span className="text-gray-400 text-sm">Travelers</span>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
              <p className="text-4xl font-black">4.9★</p>
              <span className="text-gray-400 text-sm">Ratings</span>
            </div>
          </div>
        </div>

        <div className="relative"
        >
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-400">Current Trip</p>
                <h3 className="text-3xl font-black mt-2">Tokyo Explorer</h3>
              </div>
              <div className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-2xl">
                Active
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-black/20 rounded-3xl p-5 flex items-center gap-4">
                📍
                <div>
                  <p className="font-semibold">Destination</p>
                  <p className="text-gray-400 text-sm">Tokyo, Japan</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-3xl p-5 flex items-center gap-4">
                📅
                <div>
                  <p className="font-semibold">Travel Dates</p>
                  <p className="text-gray-400 text-sm">12 June - 22 June</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-3xl p-5 flex items-center gap-4">
                💰
                <div>
                  <p className="font-semibold">Estimated Budget</p>
                  <p className="text-gray-400 text-sm">₹1,20,000</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition">
              View Full Itinerary
            </button>
          </div>
        </div>
      </section>

      <section id="dashboard" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-5xl font-black">Dashboard</h2>
            <p className="text-gray-400 mt-3">
              Manage trips, destinations, budgets and activities.
            </p>
          </div>

          <button className="bg-indigo-600 px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition">
            + Create Trip
          </button>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {[
            ['Trips Planned', '18'],
            ['Countries', '12'],
            ['Saved Budget', '₹2.8L'],
            ['Activities', '94'],
          ].map(([title, value]) => (
            <div
              key={title}
              className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl"
            >
              <p className="text-gray-400">{title}</p>
              <h3 className="text-5xl font-black mt-4">{value}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="discover" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-5xl font-black">Discover Destinations</h2>
            <p className="text-gray-400 mt-3">
              Search trending places around the world.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-[340px]">
            🔍
            <input
              placeholder="Search city or country"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">
          {destinations.map((city) => (
            <div
              key={city}
              className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-white/10 rounded-3xl p-6 hover:scale-105 transition cursor-pointer"
            >
              🌍
              <h3 className="font-bold text-xl">{city}</h3>
              <p className="text-gray-400 text-sm mt-2">Trending Destination</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-white text-black py-20 rounded-t-[48px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-5xl font-black">My Trips</h2>
              <p className="text-gray-600 mt-3">
                Organize all your travel experiences in one place.
              </p>
            </div>

            <button className="bg-black text-white px-6 py-3 rounded-2xl font-semibold">
              View All
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="rounded-[32px] overflow-hidden shadow-2xl bg-gray-100"
              >
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="h-72 w-full object-cover"
                />

                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-black">{trip.name}</h3>
                      <p className="text-gray-500 mt-2">{trip.location}</p>
                    </div>

                    <div className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-2xl font-semibold">
                      {trip.budget}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6 text-gray-600">
                    📅
                    {trip.dates}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button className="bg-black text-white px-5 py-3 rounded-2xl font-semibold">
                      View Trip
                    </button>

                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="border border-red-300 text-red-500 px-5 py-3 rounded-2xl font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planner" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-8">
              🧭
              <div>
                <h2 className="text-4xl font-black">Itinerary Builder</h2>
                <p className="text-gray-400 mt-1">
                  Build your perfect day-wise trip.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Trip Name"
                value={tripForm.name}
                onChange={(e) =>
                  setTripForm({ ...tripForm, name: e.target.value })
                }
                className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl outline-none"
              />

              <input
                type="text"
                placeholder="Destination"
                value={tripForm.destination}
                onChange={(e) =>
                  setTripForm({ ...tripForm, destination: e.target.value })
                }
                className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={tripForm.startDate}
                  onChange={(e) =>
                    setTripForm({ ...tripForm, startDate: e.target.value })
                  }
                  className="bg-black/20 border border-white/10 p-4 rounded-2xl"
                />
                <input
                  type="date"
                  value={tripForm.endDate}
                  onChange={(e) =>
                    setTripForm({ ...tripForm, endDate: e.target.value })
                  }
                  className="bg-black/20 border border-white/10 p-4 rounded-2xl"
                />
              </div>

              <textarea
                placeholder="Describe your journey"
                value={tripForm.description}
                onChange={(e) =>
                  setTripForm({ ...tripForm, description: e.target.value })
                }
                className="w-full h-40 bg-black/20 border border-white/10 p-4 rounded-2xl"
              />

              <button
                onClick={createTrip}
                className="w-full bg-indigo-600 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition"
              >
                Save Itinerary
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white/5 border border-white/10 rounded-[28px] p-7 backdrop-blur-xl"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-flex bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs mb-4">
                      Recommended Activity
                    </div>

                    <h3 className="text-3xl font-black">{activity.title}</h3>

                    <div className="flex flex-wrap gap-5 mt-5 text-gray-300">
                      <div className="flex items-center gap-2">
                        📍
                        {activity.city}
                      </div>

                      <div className="flex items-center gap-2">
                        ⏰
                        {activity.duration}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-black">{activity.price}</p>
                    <button className="mt-4 bg-white text-black px-5 py-3 rounded-2xl font-bold hover:scale-105 transition">
                      Add Activity
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="budget" className="relative z-10 bg-gradient-to-r from-indigo-600 to-cyan-600 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-6xl font-black">Budget Analytics</h2>
            <p className="text-indigo-100 mt-4 text-lg">
              Smart cost estimation for stress-free travel.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              ['Hotels', '₹68,000'],
              ['Flights', '₹54,000'],
              ['Activities', '₹21,000'],
              ['Food', '₹17,000'],
            ].map(([title, value]) => (
              <div
                key={title}
                className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[30px] p-8"
              >
                <p className="text-indigo-100">{title}</p>
                <h3 className="text-4xl font-black mt-4">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10">
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            ✅
            <div>
              <h2 className="text-4xl font-black">Packing Checklist</h2>
              <p className="text-gray-400 mt-1">
                Never forget important essentials.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {checklist.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-black/20 rounded-2xl p-5"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => {}}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">{task.item}</span>
                </div>

                <button className="text-sm text-red-300">Remove</button>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full bg-white text-black py-4 rounded-2xl font-bold">
            Add New Item
          </button>
        </div>

        <div id="journal" className="bg-white text-black rounded-[32px] p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            📝
            <div>
              <h2 className="text-4xl font-black">Travel Journal</h2>
              <p className="text-gray-500 mt-1">
                Save memories and trip notes.
              </p>
            </div>
          </div>

          <textarea
            placeholder="Write your travel story here..."
            className="w-full h-64 border border-gray-300 rounded-3xl p-5 outline-none"
          />

          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center gap-3 text-gray-600">
              👤
              Yash Wardhan
            </div>

            <button className="bg-black text-white px-6 py-3 rounded-2xl font-semibold">
              Save Notes
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-2xl">
                ✈️
              </div>
              <h2 className="text-3xl font-black">Traveloop</h2>
            </div>

            <p className="text-gray-400 mt-5 max-w-md leading-7">
              Modern intelligent travel planning platform designed for seamless
              itineraries, budgeting, collaboration and unforgettable journeys.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-5">Quick Links</h3>
            <div className="space-y-3 text-gray-400">
              <p>Dashboard</p>
              <p>Trips</p>
              <p>Activities</p>
              <p>Budget Planner</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-5">Community Rating</h3>
            <div className="flex items-center gap-2 text-yellow-400">
              ⭐
              ⭐
              ⭐
              ⭐
              ⭐
            </div>
            <p className="text-gray-400 mt-3">Trusted by thousands of travelers.</p>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
          © 2026 Traveloop. Crafted for futuristic travel experiences.
        </div>
      </footer>
    </div>
  );
}
