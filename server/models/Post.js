const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    caption: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);