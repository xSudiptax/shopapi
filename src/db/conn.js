const mongoose = require("mongoose");

const DB = "mongodb+srv://mongo:1LyQtoAJwDhdNq0K@cluster0.nuqvmev.mongodb.net/shop-api?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("connection is successful");
}).catch((e) => console.log("connection failed"));




// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/shop-api", {
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(() => {
//     console.log("db connection is successful");
// }).catch((e) =>{
//     console.log(e);
// });

// mongodb+srv://mongo:1LyQtoAJwDhdNq0K@cluster0.nuqvmev.mongodb.net/?retryWrites=true&w=majority

// 1LyQtoAJwDhdNq0K