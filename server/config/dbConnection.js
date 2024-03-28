const mongoose = require("mongoose");

const dbName = "portfolio"

// const uri = `mongodb://127.0.0.1:27017/userMail`;
// const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.uxrwv7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.uxrwv7p.mongodb.net/${dbName}`


const database = (module.exports = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(uri);
        console.log('database connected 🚀🚀');
    } catch (error) {
        console.log(error);
        console.log("database can not connecting ❌❌");
    }

});


module.exports = database;