const mongoose = require('mongoose');

//MongoDB config
mongoose.connect("mongodb://localhost:27017/nodejs", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then((req, res) => {
    console.log("Mongo DB Connected");
}).catch(error => {
    console.log(error);
});