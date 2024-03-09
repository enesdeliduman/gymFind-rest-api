const mongoose = require("mongoose")

connectDatabase = () => {

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => {
            console.log("Connect Database succesfull")
        })
        .catch(err => { console.log(err) })
};

module.exports = connectDatabase