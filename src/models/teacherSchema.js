// Title: Teacher Schema.
// Description: Handle Schema for teachers.
// Author: Md Abdullah
// Date: 14/01/24

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    subjects: [String],
    role: {
      type: String,
      enum: ['teacher', 'admin'],
      default: 'teacher',
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    picture: String,
  },
  { timestamps: true }
);

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

