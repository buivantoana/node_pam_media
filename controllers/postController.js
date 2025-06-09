const Post = require('../models/Post');

exports.getAll = async (req, res) => {
   try {
      const posts = await Post.find();
      res.json({ status: 0, data: posts });
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
