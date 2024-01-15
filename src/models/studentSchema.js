/*
 * Title: Student Schema 
 * Description: Handle Student Schema here.
 * Author: Md Abdullah
 * Date: 15/01/24
 */


//Dependencies:
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    fathersName: {
      type: String,
      required: true,
    },
    mothersName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function(value) {
          // Regular expression for validating Bangladeshi phone numbers
          const phoneNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
          return phoneNumberRegex.test(value);
        },
        message: 'Please enter a valid Bangladeshi phone number.',
      },
        },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    attendance: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        present: {
          type: Boolean,
          default: false,
        },
      },
    ],
    admissionDate: {
        type: Number,
        required: true,
      
    },
    image: {type: String},
    feesHistory: [
      {
        month: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
        paid: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
