const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema(
        {

                name: { type: String },

                gender: { type: String },
                birthdate: { type: String },
                address: { type: String },
                email: { type: String },

                mobileno: { type: String },
                joiningdate: { type: String },
                departmentname: { type: String },
                relievingdate: { type: String },
                photocode: { type: String },
                imagepath :{type:String}
        });
const Employees = mongoose.model("employees", schema);
module.exports = Employees;