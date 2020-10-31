const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// PostSchema.method("toJSON", function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });
 
const Post = mongoose.model('Post', PostSchema);
 
module.exports = Post;