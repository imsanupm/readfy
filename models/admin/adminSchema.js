const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true }  // Removed unique: true
});

module.exports = mongoose.model('Admin', AdminSchema);
