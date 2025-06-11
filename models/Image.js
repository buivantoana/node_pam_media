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
      },

      homeBanner: {
         rightImage1: String,
         leftImage2: String,
      },

      channelSliderImages: [String], // shared by recruitment and home
   },
   { timestamps: true, strict: false } // allow dynamic fields just in case
);

module.exports = mongoose.model('PageImage', dynamicImageSchema);
