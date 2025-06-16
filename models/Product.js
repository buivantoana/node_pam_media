const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String }, 
  avatar: { type: String }, 
  subscribers: { type: String },
  views: { type: String }, 
  videos: { type: String }, 
  socials: {
    youtube: { type: String },  
    facebook: { type: String },
    tiktok: { type: String },
    instagram: { type: String }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
