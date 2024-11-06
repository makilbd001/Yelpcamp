const mongoose = require('mongoose');
const axios = require('axios');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '667eb89484f6e03dff19b6f0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude, 
              ]
            },
            images: [
              {
                url: 'https://res.cloudinary.com/dkl72zxta/image/upload/v1727443796/YelpCamp/katrvtcvmlmr4mttycvu.jpg',
                filename: 'YelpCamp/katrvtcvmlmr4mttycvu',

              },
              {
                url: 'https://res.cloudinary.com/dkl72zxta/image/upload/v1727443798/YelpCamp/ndlfj37luabs70bjicpe.jpg',
                filename: 'YelpCamp/ndlfj37luabs70bjicpe',

              }
          
          
          
            ],
          
            
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            createdAt: new Date()
        })
        await camp.save();
    }
}




seedDB().then(() => {
    mongoose.connection.close();
})