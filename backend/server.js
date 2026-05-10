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