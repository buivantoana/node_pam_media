const MailConfig = require('../models/MailConfig');

exports.getAll = async (req, res) => {
   try {
      const data = await MailConfig.find();
      res.json({ status: 0, data });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.getOne = async (req, res) => {
   try {
      const mail = await MailConfig.findById(req.params.id);
      if (!mail) return res.status(404).json({ status: 1, message: 'Không tìm thấy cấu hình email' });
      res.json({ status: 0, data: mail });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.create = async (req, res) => {
   try {
      const { email } = req.body;
      if (!email) {
         return res.status(400).json({ status: 1, message: 'Thiếu email' });
      }

      const newMail = new MailConfig(req.body);
      const saved = await newMail.save();
      res.status(201).json({ status: 0, data: saved });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.update = async (req, res) => {
   try {
      const updated = await MailConfig.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ status: 1, message: 'Không tìm thấy cấu hình email' });
      res.json({ status: 0, data: updated });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};

exports.remove = async (req, res) => {
   try {
      const deleted = await MailConfig.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ status: 1, message: 'Không tìm thấy cấu hình email' });
      res.json({ status: 0, data: deleted });
   } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
   }
};
exports.setPrimary = async (req, res) => {
    try {
      const { id } = req.params;
  
      const exists = await MailConfig.findById(id);
      if (!exists) {
        return res.status(404).json({ status: 1, message: "Không tìm thấy cấu hình email" });
      }
  
      // Bỏ primary của các email khác
      await MailConfig.updateMany({}, { primary: false });
  
      // Gán primary cho id được chọn
      exists.primary = true;
      await exists.save();
  
      res.json({ status: 0, message: "Đã cập nhật email chính", data: exists });
    } catch (err) {
      res.status(500).json({ status: 1, message: err.message });
    }
  };
  