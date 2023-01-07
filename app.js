// import "./assets/js/util/socket.js";

const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:8080',
    Credential: true
}

// cors options
app.use(cors(corsOptions));

// js, css loader
app.use(express.static(__dirname + "/"));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => {
    console.log("서버가 실행됩니다.");
})