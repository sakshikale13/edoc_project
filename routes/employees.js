var express = require("express");
var fs = require("fs");
var bodyparser = require("body-parser");
const Employees = require("../models/Employees");
var jsonparser = bodyparser.json();
const router = express.Router();


router.post("/save", async(req, res) => {
    let body = req.body;
    let employees = new Employees()
    if (body.data.id != "") {
        employees = await Employees.findById(body.data.id);
    }
    employees.empid = body.data.empid;
    employees.name = body.data.name;
    employees.gender = body.data.gender;
    employees.birthdate = body.data.birthdate;
    employees.address = body.data.address;
    employees.email = body.data.email;
    employees.mobileno = body.data.mobileno;
    employees.joiningdate = body.data.joiningdate;
    employees.departmentname = body.data.departmentname;
    employees.relievingdate = body.data.relievingdate;

    if (body.data.photocode != "") {
        let imagename = (Math.random() + 1).toString(36).substring(2);
        let imagecode = body.data.photocode.replace(/^data:image\/[a-z]+;base64,/, "");
        imagename = "employeepics/" + imagename + ".png";
        fs.writeFile("public/" + imagename, imagecode, 'base64', function(res) {
                console.log("Success");
            },
            function(err) {
                console.log("Error image saving-" + err);
            });
        employees.imagepath = imagename;
    }
    employees.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res) => {

    let employees = await Employees.find();
    res.json({ data: employees });
});

router.post("/get", async(req, res) => {
    let body = req.body;

    let employees = await Employees.findById(body.data.id);
    res.json({ data: employees });
});

router.post("/delete", async(req, res) => {
    let body = req.body;

    await Employees.findByIdAndDelete(body.data.id);
    let data = {
        "data": {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});

module.exports = router;
module.exports = router;