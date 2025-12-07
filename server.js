require('dotenv').config();
const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRoute = require('./src/routes/user.route.js');
const categoryRoute = require('./src/routes/category.route.js');
const restaurantRoute = require('./src/routes/restaurant.route.js');
const foodItemRoute = require('./src/routes/foodItem.route.js'); 

const app = express();

// --- Env Check ---
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Error: Missing required environment variable '${varName}'.`);
    process.exit(1);
  }
}

// --- MongoDB Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};

// --- Middleware ---
app.use(cors());
app.use(helmet());
app.use(express.json());

// --- Routes ---
app.use('/api/', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/restaurants', restaurantRoute);
app.use('/api/food-items', foodItemRoute); 

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// --- Start Server ---
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();