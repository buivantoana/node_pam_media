const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
   try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
         return res.status(400).json({ status: 1, message: 'Thiếu thông tin đăng ký' });
      }

      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ status: 1, message: 'Email đã tồn tại' });

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ name, email, role: role || 'editor', passwordHash });
      await user.save();

      res.status(201).json({ status: 0, data: 'Đăng ký thành công' });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Login
exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ status: 1, message: 'Thiếu email hoặc mật khẩu' });
      }

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ status: 1, message: 'Sai email hoặc mật khẩu' });

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) return res.status(400).json({ status: 1, message: 'Sai email hoặc mật khẩu' });

      const token = jwt.sign(
         { id: user._id, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      res.json({
         status: 0,
         data: {
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
         }
      });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Get all users
exports.getAll = async (req, res) => {
   try {
      const users = await User.find().select('-passwordHash');
      res.json({ status: 0, data: users });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Get one
exports.getOne = async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select('-passwordHash');
      if (!user) return res.status(404).json({ status: 1, message: 'Không tìm thấy user' });
      res.json({ status: 0, data: user });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Update
exports.update = async (req, res) => {
   try {
      const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-passwordHash');
      if (!updated) return res.status(404).json({ status: 1, message: 'Không tìm thấy user' });
      res.json({ status: 0, data: updated });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Delete
exports.remove = async (req, res) => {
   try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ status: 1, message: 'Không tìm thấy user' });
      res.json({ status: 0, data: deleted });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};
