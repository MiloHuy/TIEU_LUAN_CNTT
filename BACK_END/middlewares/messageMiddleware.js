const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");

const findReceiver = async (req, res, next) => {
    const userId = req.params.user_id;
    const receiver = await User.findById(userId).select('_id').lean()
    if (!receiver) {
        return res.status(404).json({
            success: false,
            code: 11000,
            message: "Không tìm thấy người nhận",
        });
    }
    if (receiver._id.equals(req.user._id)) {
        return res.status(400).json({
            success: false,
            code: 11001,
            message: "Không được gửi tin nhắn cho bản thân",
        });
    }
    req.receiver_id = receiver._id;
    next();
};

const findConversation = async (req, res, next) => {
    const conversationId = req.params.conversation_id;
    const conversation = await Conversation.findById(conversationId).lean();
        if (!conversation) {
            return res.status(404).json({
                success: false,
                code: 11002,
                message: "Không tìm thấy đoạn chat.",
            });
        }
    next();
};

module.exports = {
    findReceiver,
    findConversation
};
