const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Art = require('../models/art');


mongoose.connect('mongodb://localhost:27017/art-site', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async () => {
    await Art.deleteMany({});
    for ( let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const pic = new Art({
            author: '5fbd4264681ea4681b54f9b4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/195845/1600x900',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum perspiciatis id, totam amet temporibus unde rerum laudantium eaque fugiat quod dolor dolore delectus veniam non veritatis dolorem. Numquam, ut voluptatem?',
            price

        })
        await pic.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})