// Title: Site Settings Schema.
// Description: Handle Schema for site settings.
// Author: Md Abdullah
// Date: 12/01/24

const { Schema, model } = require('mongoose');

const homeSchema = new Schema({
  siteInfo: {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    backgroundImage: [],
  },
  location: {
    website: { type: String, required: true },
    phone: {type: String,
      validate: {
        validator: function(value) {
          // Regular expression for validating Bangladeshi phone numbers
          const phoneNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
          return phoneNumberRegex.test(value);
        },
        message: 'Please enter a valid Bangladeshi phone number.',
      },
    },
    whatsApp: {
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
    email: { type: String, required: true },
    address: {
      street: String,
      city: String,
      district: String,
      zip: String,
    },
  },
  gallery: [
    {
      event_name: { type: String, required: true },
      event_collection: [],
    }
  ],
  notice: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    }
  ],
  utility: [
    {
      year: Number,
      month: String,
      amount: Number,
      paid: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

const HomeInfo = model('HomeInfo', homeSchema);

module.exports = HomeInfo;
