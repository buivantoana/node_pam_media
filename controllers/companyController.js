const Company = require('../models/Company');

// Lấy thông tin công ty (giả định có duy nhất một bản ghi)
exports.getInfo = async (req, res) => {
   try {
      const company = await Company.findOne();
      if (!company) return res.status(404).json({ status: 1, message: 'Không tìm thấy thông tin công ty' });
      res.json({ status: 0, data: company });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Tạo mới thông tin công ty
exports.create = async (req, res) => {
    try {
       const { name, address, email, phone } = req.body;
 
       if (!name || !address || !email || !phone) {
          return res.status(400).json({ status: 1, message: 'Thiếu trường bắt buộc' });
       }
 
       // Bước 1: Cập nhật tất cả các công ty hiện tại thành primary = false
       await Company.updateMany({ primary: true }, { $set: { primary: false } });
 
       // Bước 2: Tạo công ty mới và đặt primary = true
       const newCompany = new Company({ ...req.body, primary: true });
 
       const saved = await newCompany.save();
       res.status(201).json({ status: 0, data: saved });
    } catch (err) {
       res.status(500).json({ status: 1, message: err.message });
    }
 };
 

// Cập nhật thông tin công ty theo ID
exports.update = async (req, res) => {
    try {
       const { primary } = req.body;
 
       // Nếu update là primary: true, thì reset các bản ghi khác
       if (primary === true) {
          await Company.updateMany({ primary: true }, { primary: false });
       }
 
       const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
 
       if (!updated) return res.status(404).json({ status: 1, message: 'Không tìm thấy công ty' });
       res.json({ status: 0, data: updated });
 
    } catch (err) {
       res.status(500).json({ status: 1, message: err.message });
    }
 };
 
 exports.getPrimary = async (req, res) => {
    try {
       const company = await Company.findOne({ primary: true });
       if (!company) return res.status(404).json({ status: 1, message: 'Không có công ty chính nào' });
       res.json({ status: 0, data: company });
    } catch (err) {
       res.status(500).json({ status: 1, message: err.message });
    }
 };
 
// Xóa thông tin công ty theo ID (có thể không cần nếu chỉ dùng 1 bản ghi)
exports.remove = async (req, res) => {
   try {
      const deleted = await Company.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ status: 1, message: 'Không tìm thấy thông tin công ty' });
      res.json({ status: 0, data: deleted });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Lấy thông tin công ty theo ID (nếu dùng nhiều bản ghi)
exports.getOne = async (req, res) => {
   try {
      const company = await Company.findById(req.params.id);
      if (!company) return res.status(404).json({ status: 1, message: 'Không tìm thấy thông tin công ty' });
      res.json({ status: 0, data: company });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

// Lấy tất cả bản ghi công ty (nếu cần quản lý nhiều)
exports.getAll = async (req, res) => {
   try {
      const data = await Company.find();
      res.json({ status: 0, data });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};
