/*
 * Title: Site Settings Schema. 
 * Description: handle Schema for site settings.
 * Author: Md Abdullah
 * Date: 12/01/24
 */



const { Schema, model } = require("mongoose");


const homeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    backgroundImage: {
        type: String,
        required: true
    }
}, { timestamps: true });


const HomeInfo = model('HomeInfo', homeSchema);
module.exports = HomeInfo;
