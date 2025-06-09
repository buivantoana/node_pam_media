const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   role: { type: String, enum: ['admin', 'editor'] },
   passwordHash: String
});

module.exports = mongoose.model('User', userSchema);
