require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./src/models/category.model.js');
const Restaurant = require('./src/models/restaurant.model.js');
const FoodItem = require('./src/models/foodItem.model.js');
const { categories, restaurants, foodItems } = require('./data.js'); // your frontend-style data

const MONGO_URI = process.env.MONGO_URI;

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Category.deleteMany();
    await Restaurant.deleteMany();
    await FoodItem.deleteMany();
    console.log('Existing data cleared.');

    // --- Insert Categories ---
    const insertedCategories = await Category.insertMany(
      categories.map(({ id, ...rest }) => rest)
    );
    console.log('Categories inserted.');

    // Map category names to IDs
    const categoryMap = insertedCategories.reduce((acc, cat) => {
      acc[cat.name] = cat._id;
      return acc;
    }, {});

    // --- Insert Restaurants ---
    const restaurantsWithCategoryIds = restaurants.map(({ id, category, ...rest }) => ({
      ...rest,
      category: categoryMap[category],
    }));
    const insertedRestaurants = await Restaurant.insertMany(restaurantsWithCategoryIds);
    console.log('Restaurants inserted.');

    // Map restaurant names to IDs
    const restaurantMap = insertedRestaurants.reduce((acc, rest) => {
      acc[rest.name] = rest._id;
      return acc;
    }, {});

    // --- Insert Food Items ---
    const foodItemsWithIds = foodItems.map(({ id, category, restaurant, ...rest }) => ({
      ...rest,
      category: categoryMap[category],
      restaurant: restaurantMap[restaurant],
    }));
    await FoodItem.insertMany(foodItemsWithIds);
    console.log('Food items inserted.');

    console.log('Data seeding complete! ✅');
    process.exit();
  } catch (error) {
    console.error('Error during data seeding:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for data destruction...');

    await Category.deleteMany();
    await Restaurant.deleteMany();
    await FoodItem.deleteMany();
    console.log('All data destroyed! 💥');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

// Run with: node seeder.js -> seed data
// Run with: node seeder.js -d -> delete all data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}