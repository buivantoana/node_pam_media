const Category = require('../models/Category');

exports.getAll = async (req, res) => {
   try {
      const data = await Category.find();
      res.json({ status: 0, data });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.getOne = async (req, res) => {
   try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ status: 1, message: 'Không tìm thấy category' });
      res.json({ status: 0, data: category });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.create = async (req, res) => {
   try {
      const { name, slug } = req.body;
      if (!name || !slug) {
         return res.status(400).json({ status: 1, message: 'Thiếu name hoặc slug' });
      }

      const newCate = new Category(req.body);
      const saved = await newCate.save();
      res.status(201).json({ status: 0, data: saved });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.update = async (req, res) => {
   try {
      const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ status: 1, message: 'Không tìm thấy category' });
      res.json({ status: 0, data: updated });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.remove = async (req, res) => {
   try {
      const deleted = await Category.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ status: 1, message: 'Không tìm thấy category' });
      res.json({ status: 0, data: deleted });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};
