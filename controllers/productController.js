const Product = require('../models/Product');
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const { limit, skip } = req.query;

    const pipeline = [
      // Có thể thêm $match nếu muốn lọc
      { $sort: { createdAt: -1 } },

      ...(skip ? [{ $skip: parseInt(skip) }] : []),
      ...(limit ? [{ $limit: parseInt(limit) }] : [])
    ];

    const products = await mongoose.model("Product").aggregate(pipeline);
    const total = await mongoose.model("Product").countDocuments();

    res.json({ status: 0, data: products, total });
  } catch (err) {
    res.status(500).json({ status: 1, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ status: 1, message: 'Product not found' });
    res.json({ status: 0, data: product });
  } catch (err) {
    res.status(500).json({ status: 1, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, avatar } = req.body;

    if (!name || !avatar) {
      return res.status(400).json({ status: 1, message: 'Thiếu thông tin bắt buộc' });
    }

    const newProduct = new Product(req.body);
    const saved = await newProduct.save();

    res.status(201).json({ status: 0, data: saved });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ status: 1, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 1, message: 'Product not found' });
    res.json({ status: 0, data: updated });
  } catch (err) {
    res.status(500).json({ status: 1, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: 1, message: 'Product not found' });
    res.json({ status: 0, data: deleted });
  } catch (err) {
    res.status(500).json({ status: 1, message: err.message });
  }
};
