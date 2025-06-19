const mongoose = require('mongoose');

const dynamicImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // "recruitment", "cooperate", "home", etc.

    recruitment: {
      rightImage1: String,
      leftImage2: String,
      title2: String,
      description: String,
    },

    cooperate: {
      image1: String,
      image2: String,
      image3: String,
      image4: String,
      image5: String,
      image6: String,
      image7: String,
      image8: String,
      image9: String,
      topImage: String,
      title: String,
      description: String,
      title1: String,
      title2: String,
      title3: String,
      title4: String,
      title5: String,
      title6: String,
      title7: String,
      title8: String,
      title9: String,
    },

    homeBanner: {
      rightImage1: String,
      bottomImage: String,
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