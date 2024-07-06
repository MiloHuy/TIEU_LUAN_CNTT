class NotificationSocket {
  constructor() {
      this.io = null;
  }

  init(serverIo) {
      this.io = serverIo;

      this.io.on("connection", (socket) => {
          console.log(`⚡: ${socket.id} người dùng vừa kết nối!`);

          socket.on("notis", (noti) => {
              try {
                  console.log("noti: " + Object.entries(noti));
              } catch (error) {
                  console.error("Lỗi khi xử lý thông báo:", error);
              }
          });

          socket.on('disconnect', () => {
              console.log('🔥: Một người dùng đã ngắt kết nối');
          });
      });
  }

  sendNotification(notification, user_id) {
      if (this.io) {
        console.log("notification: " + Object.entries(notification));
        //   this.io.emit('getNotiForLikePost', notification);
          this.io.emit(user_id, notification);
      } else {
          console.error("Socket.IO chưa được khởi tạo");
      }
  }
}

module.exports = new NotificationSocket();
