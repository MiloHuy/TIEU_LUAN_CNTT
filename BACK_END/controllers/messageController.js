const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.receiver_id;
        const messageContent = req.body.message_content;
        if (!messageContent) {
            return res.status(500).json({
                success: false,
                code: 11012,
                message: "Tin nhắn phải có nội dung.",
            });
        }
        const participates = [senderId, receiverId];

        let conversation = await Conversation.findOne({
            participates: { $all: participates },
        });
        if (!conversation) {
            conversation = new Conversation({ participates });
        }

        const message = new Message({
            content: messageContent,
            conversation_id: conversation._id,
            sender_id: senderId,
        });

        conversation.last_message = message;
        conversation.last_time = new Date();

        await Promise.all([message.save(), conversation.save()]);

        return res.status(200).json({
            success: true,
            message: "Gửi tin nhắn thành công.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 11011,
            message: "Gửi tin nhắn thất bại " + error.message,
        });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const conversationId = req.params.conversation_id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const [messages, totals] = await Promise.all([
            Message.find({ conversation_id: conversationId })
                .populate("sender_id", "first_name last_name avatar.url")
                .sort({ create_message_time: -1 })
                .limit(Number(size))
                .skip(skip),
            Message.countDocuments({ conversation_id: conversationId }),
        ]);

        return res.status(200).json({
            success: true,
            messages,
            totals,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 11012,
            message: "Lấy tin nhắn thất bại " + error.message,
        });
    }
};

exports.getConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const [conversations, totals] = await Promise.all([
            Conversation.find({ participates: { $in: userId } })
                .populate("participates", "first_name last_name avatar.url")
                .populate("last_message", "content sender_id")
                .sort({ last_time: -1 })
                .limit(Number(size))
                .skip(skip),
            Conversation.countDocuments({ participates: { $in: userId } }),
        ]);

        const filteredConversations = conversations.map((conversation) => {
            const otherUser = conversation.participates.find(
                (participant) =>
                    participant._id.toString() !== userId.toString()
            );

            return {
                _id: conversation._id,
                other_user: otherUser,
                last_message: conversation.last_message,
                last_time: conversation.last_time,
            };
        });

        return res.status(200).json({
            success: true,
            conversations: filteredConversations,
            totals,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 11012,
            message: "Lấy tin nhắn thất bại " + error.message,
        });
    }
};
