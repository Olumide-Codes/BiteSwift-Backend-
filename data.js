// data.js
const categories = [
  {
    name: 'Rice & Pasta',
    image: 'https://cdn-icons-png.flaticon.com/512/1377/1377194.png',
  },
  {
    name: 'Burgers',
    image: 'https://cdn-icons-png.flaticon.com/512/1377/1377194.png',
  },
  {
    name: 'Pizza',
    image: 'https://cdn-icons-png.flaticon.com/512/1377/1377194.png',
  },
  {
    name: 'Sandwiches',
    image: 'https://cdn-icons-png.flaticon.com/512/1377/1377194.png',
  },
  {
    name: 'Drinks',
    image: 'https://cdn-icons-png.flaticon.com/512/1377/1377194.png',
  },
];

const restaurants = [
  {
    name: 'Pramos Kitchen',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0dCEW06yxFHIRbZ7N9lQDpOO2Tyo-ntsnNaaPmZE-lMYL3ODJU7lSdM&s=10',
    location: 'Ikeja',
    rating: 4.9,
    reviews: 2000,
    deliveryFee: '₦700',
    time: '40 - 50 min',
    category: 'Rice & Pasta',
  },
  {
    name: 'Burger Boss',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0dCEW06yxFHIRbZ7N9lQDpOO2Tyo-ntsnNaaPmZE-lMYL3ODJU7lSdM&s=10',
    location: 'Surulere',
    rating: 4.5,
    reviews: 1675,
    deliveryFee: '₦500',
    time: '30 - 40 min',
    category: 'Burgers',
  },
];

const foodItems = [
  {
    name: 'Jollof Rice',
    category: 'Rice & Pasta',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZ5dtpW67q7E226MLQd_ULMl3zRg0QSWNFVXlSDeri5h3FBUbmX8F7fYN&s=10',
    price: 7.99,
    oldPrice: 8.99,
    restaurant: 'Pramos Kitchen',
    description: 'Spicy Jollof with Egg',
  },
  {
    name: 'Beef Burger',
    category: 'Burgers',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZ5dtpW67q7E226MLQd_ULMl3zRg0QSWNFVXlSDeri5h3FBUbmX8F7fYN&s=10',
    price: 5.99,
    oldPrice: 8.99,
    restaurant: 'Burger Boss',
    description: 'Juicy beef burger with cheese',
  },
];

module.exports = {
  categories,
  restaurants,
  foodItems,
};