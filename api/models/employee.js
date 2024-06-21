const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  qualifications: String,
  address: String,
  contactNumber: String,
  resume: String,
  degreeCertificate: String,
  aadharCard: String,
  panCard: String,
  bankPassbook: String,
  photo: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;