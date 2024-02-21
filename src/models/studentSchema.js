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
        year: {
        type: Number,
        required: true
      },
      month: {
        type: String,
        required: true
      },
      day: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
      }
      }
    ],
    admissionDate: {
        type: Number,
        required: true,
      
    },
    image: { type: String },
    tution_fees: {type: Number, required: true},
    feesHistory: [
      {
        year: {
          type: Number,
          required: true,
        },
        month: {
          type: String,
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
