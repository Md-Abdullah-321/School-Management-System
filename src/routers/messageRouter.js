/*
 * Title: Message Router 
 * Description: handle message router here.
 * Author: Md Abdullah
 * Date: 15/01/24
 */

const express = require("express");
const {handleGetMessages, handlePostMessage, handleSeenMessage } = require("../controllers/messageController");
const { validatePostMessage } = require("../validators/auth");
const runValidation = require("../validators");
const messageRouter = express.Router();


//GET -> seen message by id:
messageRouter.get("/:id", handleSeenMessage);

//GET -> get all message:
messageRouter.get("/", handleGetMessages);

//POST -> post a message:
messageRouter.post("/",validatePostMessage, runValidation,handlePostMessage);


module.exports = messageRouter;