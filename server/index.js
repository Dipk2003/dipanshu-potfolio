import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDb = async () => {
  try {
    // Ensure DB_URI is loaded correctly
    console.log('DB_URI:', process.env.DB_URI); // Debugging line to confirm the DB_URI value
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit on error
  }
};

connectDb();

// MongoDB Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

// API Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new contact document
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: 'Contact data saved successfully' });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
