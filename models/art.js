const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtSchema = new Schema ({
    title: String,
    image: [
        {   
            url: String,
            filename: String
        }
    ],
    price: Number,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports =mongoose.model('Art', ArtSchema);