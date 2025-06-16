const mongoose = require('mongoose');

const dynamicImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // "recruitment", "cooperate", "home", etc.
    
    recruitment: {
      rightImage1: String,
      leftImage2: String,
    },

    cooperate: {
      image1: String,
      image2: String,
      image3: String,
      topImage: String,
      title: String,
      description: String,
    },

    homeBanner: {
      rightImage1: String,
      leftImage2: String,
      bannerLeftTop: String,
      bannerLeftBottom: String,
      bannerRightTop: String,
      bannerRightBottom: String,
      title1: String,
      title2: String,
      description: String,
    },

    channelSliderImages: [String], // shared by recruitment and home
  },
  { timestamps: true, strict: false } // allow dynamic fields just in case
);

module.exports = mongoose.model('PageImage', dynamicImageSchema);