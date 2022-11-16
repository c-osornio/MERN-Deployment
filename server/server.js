const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors') 
const port = 8000;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const http = require('http').createServer(app);
http.listen(port, () => {
    console.log(`Listening on: ${port}`);
});

const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('io connected');
});

app.use(cors({
    origin: "*:*",
}))  

app.use(express.json(), express.urlencoded({ extended: true }));

// config
require("./config/mongoose.config");

// routes
require("./routes/pet.routes")(app);


const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );

// const io = socket(server, {
//     cors: {
//         origin: "*:*",
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['*'],
//         credentials: true,
//     }
// });

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    // Socket for when a new pet is created
    socket.on("new_pet", (data) => {
        socket.broadcast.emit("receive_pets", data)
    });
    // Socket for when a pet is adopted 
    socket.on("remove_pet", (data) => {
        socket.broadcast.emit("receive_removal", data)
    });
});