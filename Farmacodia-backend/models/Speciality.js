const mongoose = require('mongoose');

const specialitySchema = new mongoose.Schema({
  name: String,
  symptoms: [String]
});

const Speciality = mongoose.model('Speciality', specialitySchema);

module.exports = Speciality;