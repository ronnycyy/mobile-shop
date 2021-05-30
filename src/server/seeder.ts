import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/user';
import products from './data/products';
import User from './models/user';
import Product from './models/product';
import Order from './models/order';
import connectDB from './config/db';

colors.enable();
dotenv.config();
connectDB();  // connect mongoDB first.

const clearDataBase = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log(`mongoDB data cleared.`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const initData = async () => {
  try {
    // clear old data
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    // insert new data
    const createdUsers = await User.insertMany(users);

    const adminUserId = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId }
    })

    await Product.insertMany(sampleProducts);

    console.log(`mongoDB data inited.`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}


// execute in terminal
if (process.argv[2] === '--clear') {
  clearDataBase();
} else {
  initData();
}

