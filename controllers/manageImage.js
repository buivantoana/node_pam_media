const Image = require('../models/Image');

exports.create = async (req, res) => {
   try {
      const newImage = new Image(req.body);
      const saved = await newImage.save();

      console.log('Saved Image:', saved);

      res.status(201).json({ status: 0, data: saved });
   } catch (err) {
      console.error('Create Image error:', err);
      res.status(500).json({ status: 1, message: err.message });
   }
};


exports.getByName = async (req, res) => {
   try {
      const name = req.params.name;

      const imageData = await Image.findOne({ name });

      if (!imageData) {
         return res.status(404).json({ status: 1, message: `Không tìm thấy dữ liệu với name: ${name}` });
      }

      res.status(200).json({ status: 0, data: imageData });
   } catch (err) {
      console.error('Get Image by name error:', err);
      res.status(500).json({ status: 1, message: err.message });
   }
};
exports.updateByName = async (req, res) => {
   try {
      const name = req.params.name;
      const updateData = req.body;

      const updated = await Image.findOneAndUpdate(
         { name },
         updateData,
         { new: true, upsert: false } // trả về document mới sau khi update
      );

      if (!updated) {
         return res.status(404).json({ status: 1, message: `Không tìm thấy dữ liệu với name: ${name}` });
      }

      res.status(200).json({ status: 0, data: updated });
   } catch (err) {
      console.error('Update Image by name error:', err);
      res.status(500).json({ status: 1, message: err.message });
   }
};