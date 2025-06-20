const nodemailer = require("nodemailer");
const fs = require("fs");
const MailConfig = require("../models/MailConfig");
require("dotenv").config();

exports.handleJobApplication = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;
    const file = req.file;

    if (!name || !email || !phone || !position || !file) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    const activeMail = await MailConfig.findOne({ primary: true });
    const toEmail = activeMail?.email || process.env.MAIL_RECEIVER;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Website Tuyển Dụng" <${process.env.MAIL_USER}>`,
      to: toEmail? toEmail: process.env.MAIL_RECEIVER,
      subject: `Ứng tuyển: ${position} - ${name}`,
      html: `
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Vị trí ứng tuyển:</strong> ${position}</p>
      `,
      attachments: [
        {
          filename: file.originalname,
          path: file.path
        }
      ]
    });

    fs.unlinkSync(file.path); // Xóa file sau khi gửi

    res.json({ message: "Ứng tuyển thành công!" });
  } catch (error) {
    console.error("Lỗi gửi mail:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi gửi email." });
  }
};
