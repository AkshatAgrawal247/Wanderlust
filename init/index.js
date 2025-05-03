const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://localhost:27017/wanderlust';

main()
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj)=>({...obj,owner:"680c8db83fd5e5cca9d8c5ec"}));
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
};

initDB();