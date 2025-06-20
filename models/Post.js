const mongoose = require('mongoose');

const jobDetailSchema = new mongoose.Schema({
   location: String,
   salary: String,
   jobType: String,
   deadline: Date,
});

const postSchema = new mongoose.Schema({
   title: { type: String, required: true },
   slug: { type: String },
   type: { type: String, enum: ['job', 'news'], required: true },
   content: { type: String, required: true },
   summary: String,
   imageUrl: String,
   status: { type: String, enum: ['draft', 'published'], default: 'draft' },
   publishedAt: Date,
   categories: [String],
   jobDetail: jobDetailSchema,
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
   qty:Number
});

module.exports = mongoose.model('Post', postSchema);
