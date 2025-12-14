const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);