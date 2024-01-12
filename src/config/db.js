/*
 * Title: Database connection 
 * Description: handle function for database connection.
 * Author: Md Abdullah
 * Date: 12/01/24
 */



const mongoose = require('mongoose');
const { options } = require('../app');
require("dotenv").config();
const Database_URL = process.env.DATABASE || "mongodb+srv://abdullah:schoolmanagementsystem@cluster0.yn2eyhr.mongodb.net/sms";

const connectionDB = async (options = {}) => {
    try {
        await mongoose.connect(Database_URL);
        console.log("Database Connected");

        mongoose.connection.on('error', (error) => {
            console.log(error);
        })
    } catch (error) {
        console.log('Could not connect to Database');
    }
}


module.exports = connectionDB;