const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ledosportsacademy:iD0xFkdX5IqDXWLK@cluster0.bpaauiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('📊 Database: Cluster0');
  console.log('🔗 Connection: mongodb+srv://ledosportsacademy:****@cluster0.bpaauiy.mongodb.net/');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  process.exit(1);
});

// MongoDB Models
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  phone: { type: String, required: true },
  joinDate: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
});

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop' },
  status: { type: String, enum: ['upcoming', 'recent', 'completed'], default: 'upcoming' },
  type: { type: String, default: 'match' },
  priority: { type: String, default: 'medium' },
  redirectUrl: { type: String, default: '' },
  openNewTab: { type: Boolean, default: false }
});

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  purpose: { type: String, required: true }
});

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  vendor: { type: String, required: true },
  paymentMethod: { type: String, required: true }
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop' }
});

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  album: { type: String, default: '' },
  isTopFive: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
});

const heroSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  ctaText: { type: String, required: true },
  ctaLink: { type: String, required: true },
  redirectUrl: { type: String, default: '' },
  openNewTab: { type: Boolean, default: false }
});

const weeklyFeeSchema = new mongoose.Schema({
  memberId: { type: Number, required: true },
  memberName: { type: String, required: true },
  payments: [{
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' }
  }]
});

// Create models
const Member = mongoose.model('Member', memberSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Donation = mongoose.model('Donation', donationSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);
const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
const WeeklyFee = mongoose.model('WeeklyFee', weeklyFeeSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes for Members
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API Routes for Activities
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/activities/:id', async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API Routes for Donations
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/donations', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/donations/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/donations/:id', async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API Routes for Expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API Routes for Experiences
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/experiences', async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/experiences/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API Routes for Gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const galleryItem = new Gallery(req.body);
    await galleryItem.save();
    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/gallery/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(galleryItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API Routes for Hero Slides
app.get('/api/hero-slides', async (req, res) => {
  try {
    const heroSlides = await HeroSlide.find();
    res.json(heroSlides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/hero-slides', async (req, res) => {
  try {
    const heroSlide = new HeroSlide(req.body);
    await heroSlide.save();
    res.status(201).json(heroSlide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/hero-slides/:id', async (req, res) => {
  try {
    const heroSlide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(heroSlide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/hero-slides/:id', async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hero slide deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API Routes for Weekly Fees
app.get('/api/weekly-fees', async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find();
    res.json(weeklyFees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/weekly-fees', async (req, res) => {
  try {
    const weeklyFee = new WeeklyFee(req.body);
    await weeklyFee.save();
    res.status(201).json(weeklyFee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/weekly-fees/:id', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(weeklyFee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/weekly-fees/:id', async (req, res) => {
  try {
    await WeeklyFee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Weekly fee record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Dashboard Stats API
app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalActivities = await Activity.countDocuments();
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const stats = {
      totalMembers,
      totalActivities,
      totalDonations: totalDonations[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      netBalance: (totalDonations[0]?.total || 0) - (totalExpenses[0]?.total || 0)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Ledo Sports Academy API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  mongoose.connection.close(() => {
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  });
}); 