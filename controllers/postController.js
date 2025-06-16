const Post = require('../models/Post');

const mongoose = require("mongoose");
exports.getAll = async (req, res) => {
  try {
    const { limit, skip, categories, type } = req.query;

    // Xây filter
    const match = {};

    if (type) {
      match.type = type;
    }

    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories
        : categories.split(',');
      match.categories = { $in: categoryArray };
    }

    const pipeline = [
      { $match: match },

      // Join sang bảng categories
      {
        $lookup: {
          from: "categories", // collection name
          localField: "categories", // post.categories (array slug)
          foreignField: "slug",     // categories.slug
          as: "categoryDetails"
        }
      },

      { $sort: { publishedAt: -1 } },

      // Phân trang nếu có
      ...(skip ? [{ $skip: parseInt(skip) }] : []),
      ...(limit ? [{ $limit: parseInt(limit) }] : [])
    ];

    const posts = await mongoose.model("Post").aggregate(pipeline);
    const total = await mongoose.model("Post").countDocuments(match);

    res.json({ status: 0, data: posts, total });
  } catch (err) {
    res.status(500).json({ status: 1, message: err.message });
  }
};

exports.getOne = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ status: 1, message: 'Post not found' });
      res.json({ status: 0, data: post });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.create = async (req, res) => {
   try {
      console.log('Request body:', req.body);

      const { title, type, content } = req.body;
      if (!title || !type || !content) {
         return res.status(400).json({ status: 1, message: 'Thiếu thông tin bắt buộc' });
      }

      const newPost = new Post(req.body);
      const saved = await newPost.save();

      console.log('Saved post:', saved);

      res.status(201).json({ status: 0, data: saved });
   } catch (err) {
      console.error('Create post error:', err);
      res.status(500).json({ status: 1, message: err.message });
   }
};



exports.update = async (req, res) => {
   try {
      const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ status: 1, message: 'Post not found' });
      res.json({ status: 0, data: updated });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.remove = async (req, res) => {
   try {
      const deleted = await Post.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ status: 1, message: 'Post not found' });
      res.json({ status: 0, data: deleted });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};
