const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = `mongodb+srv://myTodoDB:t4Dr9HKQO7CJIJv9>@cluster0.trk6n.mongodb.net/test`;

mongoClient
    .connect(url)
    .then((client => {
        console.log("mongo");
        console.log(client);
    }))
   
    .catch(err => console.log(err));