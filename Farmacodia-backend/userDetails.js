const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
    {
        uname: String,
        email: String,
        phoneNo: String,
    }, 
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);