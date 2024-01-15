/*
 * Title: Message Controller 
 * Description: handle message controller here.
 * Author: Md Abdullah
 * Date: 15/01/24
 */

const checkExistanceWithId = require("../helper/checkExistanceWithId");
const Message = require("../models/messageSchema");
const { successResponse } = require("./responseController");


const handleGetMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({});

        successResponse(res, {
            successResponse: 200,
            message: "Messages fetched successfully.",
            payload: messages
        })
    } catch (error) {
        next(error);
    }
}


const handlePostMessage = async (req, res, next) => {
    try {
        const messageInfo = { name, email, phoneNumber, message } = req.body;
        const sentMessage = await Message.create(messageInfo);

        successResponse(res, {
            successResponse: 200,
            message: "Messages sent successfully.",
            payload: sentMessage
        })
    } catch (error) {
        next(error);
    }
}


const handleSeenMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await checkExistanceWithId(Message, id);

        let updatedMsg;
        if (message.seen === false) {
            updatedMsg = await Message.findOneAndUpdate({ _id: id }, { seen: true }, { new: true });
        }

        successResponse(res, {
            successResponse: 200,
            message: "Messages has been read.",
            payload: updatedMsg
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    handleGetMessages,
    handlePostMessage,
    handleSeenMessage,
}