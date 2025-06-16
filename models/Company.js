const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  socialLinks: {
    instagram: String,
    facebook: String,
    tiktok: String,
    linkedin: String,
    youtube: String
  },
  primary: {
    type: Boolean,
    default: false // mặc định không phải chính
  },
  copyrightYear: {
    type: Number,
    default: new Date().getFullYear()
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

companySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Company', companySchema);
