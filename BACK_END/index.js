const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

const { Server } = require("socket.io");
const { createServer } = require("node:http");
const { join } = require("node:path");

const route = require("./routes");
const connectDatabase = require("./config/database");

const app = express();
const port = 3000;

dotenv.config();
connectDatabase();

const corsOptions = {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(fileUpload());

// Route init
route(app);

const server = createServer(app);
const io = new Server(server);

app.set('io', io);

io.on('connection', (socket) => {
    socket.on('notis', (noti) => {
      console.log('noti: ' + noti.content + ' post_id: ' + noti.post_id);
    });
  });

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(join(__dirname, "index1.html"));
});


server.listen(port, () => {
    console.log("server running at http://localhost:3000");
});
