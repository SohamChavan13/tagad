import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import routes
import homeRoutes from './routes/home.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', homeRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Database connection function
async function connectDB() {
  try {
    // Use MongoDB Atlas connection string from environment variable
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.log('⚠️  No MongoDB connection string found in environment variables.');
      console.log('   The application will run without database functionality.');
      console.log('   To enable database features, please set MONGODB_URI in your .env file.');
      console.log('   Example: MONGODB_URI=mongodb://localhost:27017/your-database-name');
      console.log('   Or use MongoDB Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
      return false;
    }

    console.log('🔄 Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('   The application will continue running without database functionality.');
    console.log('   Please check your MongoDB connection string and ensure the database server is running.');
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('   💡 If using a local MongoDB, make sure MongoDB is installed and running:');
      console.log('      - Install MongoDB: https://docs.mongodb.com/manual/installation/');
      console.log('      - Start MongoDB service or run: mongod');
      console.log('   💡 If using MongoDB Atlas, verify your connection string and network access.');
    }
    
    return false;
  }
}

// Start server function
async function startServer() {
  // Attempt to connect to database
  const dbConnected = await connectDB();
  
  // Start the server regardless of database connection status
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    if (!dbConnected) {
      console.log('📝 Note: Database features may be limited without MongoDB connection');
      console.log('   The application will work for static content and non-database features');
    }
  });
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  }
  process.exit(0);
});

// Start the application
startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

export default app;