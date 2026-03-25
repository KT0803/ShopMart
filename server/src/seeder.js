require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const dummyProducts = [
  {
    name: 'AirPods Pro Gen 2',
    description: 'Active Noise Cancellation for immersive sound. Now with adaptive transparency.',
    price: 249,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=1000',
    stock: 10,
  },
  {
    name: 'Mechanical Keyboard X',
    description: 'Premium tactile feedback with fully customizable RGB. Built for developers.',
    price: 150,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000',
    stock: 20,
  },
  {
    name: 'OLED Smart TV 55"',
    description: 'Perfect blacks, infinite contrast, and over a billion colors.',
    price: 1299,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000',
    stock: 5,
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Ultrafast MAGSPEED scrolling, quiet clicks, and ergonomic precision.',
    price: 99.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1000',
    stock: 50,
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry leading noise canceling headphones with dual processors.',
    price: 398,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000',
    stock: 15,
  },
  {
    name: 'Apple MacBook Pro M3',
    description: 'Mind-blowing speed and 22-hour battery life. The ultimate pro laptop.',
    price: 1999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
    stock: 8,
  },
  {
    name: 'Samsung 49" Odyssey G9',
    description: 'Curved gaming monitor matching the curve of the human eye for maximum immersion.',
    price: 1499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
    stock: 3,
  },
  {
    name: 'Ergonomic Desk Chair',
    description: 'Breathable mesh, lumbar support, and adjustable headrest for all-day coding.',
    price: 299,
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=1000',
    stock: 12,
  },
  {
    name: 'DJI Mini 3 Pro Drone',
    description: 'Fly mini, create big. Lightweight and foldable camera drone with 4K HDR.',
    price: 759,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1000',
    stock: 7,
  },
  {
    name: 'GoPro HERO12 Black',
    description: 'The most powerful GoPro ever. Unreal image quality and HyperSmooth stabilization.',
    price: 399,
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1544368565-d41a7201b1cb?auto=format&fit=crop&q=80&w=1000',
    stock: 25,
  },
  {
    name: 'Bose Smart Soundbar 900',
    description: 'Premium Dolby Atmos soundbar for immersive cinematic home theatre.',
    price: 899,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1546484396-fb3fade47ea1?auto=format&fit=crop&q=80&w=1000',
    stock: 4,
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Play at home or on the go with a vibrant 7-inch OLED screen.',
    price: 349.99,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=1000',
    stock: 30,
  },
  {
    name: 'ASUS ROG Zephyrus G14',
    description: 'Compact, powerful, and ready for gaming anywhere with an AMD Ryzen 9 processor.',
    price: 1599,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000',
    stock: 5,
  },
  {
    name: 'Blue Yeti USB Mic',
    description: 'Professional USB microphone for recording and streaming. Clear studio-quality sound.',
    price: 129,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1583333223166-97d02868a834?auto=format&fit=crop&q=80&w=1000',
    stock: 20,
  },
  {
    name: 'HHKB Professional HYBRID',
    description: 'The ultimate minimalist mechanical keyboard. Capacitive key switches for supreme feel.',
    price: 350,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1595225384243-98f99c43a042?auto=format&fit=crop&q=80&w=1000',
    stock: 12,
  },
  {
    name: 'Steelcase Gesture Chair',
    description: 'Designed to support the greatest range of technologies and users postures.',
    price: 1199,
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=1000',
    stock: 10,
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(dummyProducts);
    // eslint-disable-next-line no-console
    console.log('Dummy Data Imported Successfully!');
    process.exit();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
