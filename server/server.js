const express = require('express');
const app = express();
const cors = require('cors') 
const port = 8000;
const socket = require('socket.io');

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))  

app.use(express.json(), express.urlencoded({ extended: true }));

// config
require("./config/mongoose.config");

// routes
require("./routes/pet.routes")(app);


const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    // Socket for when a new pet is created
    socket.on("new_pet", (data) => {
        socket.broadcast.emit("receive_pets", data)
    });
    // Socket for when a pet is adopted 
    socket.on("remove_pet", (data) => {
        socket.broadcast.emit("receive_removal", data)
    });
});


