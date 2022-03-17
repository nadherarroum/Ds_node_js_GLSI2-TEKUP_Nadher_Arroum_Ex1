const router    = require('express').Router();
const bcrypt = require('bcryptjs');
const { route } = require('express/lib/application');
const req       = require('express/lib/request');
const {Student, student_validation} = require('../models/student');


router.post('/register',async(req,res) => {
    // Validate the data before
    let validation_res = student_validation.validate(req.body);
    if (validation_res.error)
        return res.status(400).send(validation_res.error.details[0].message);

    // Verify if email exists
    const emailExist = await Student.findOne({email : req.body.email});
    if (emailExist)
        return res.status(400).send('Email already exists !');
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    // Create new Student
    try{
        let student = new Student({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        });
        student = await student.save();
        res.send(student);
    }catch(err){
        res.status(400).send(err);
    }
});


module.exports=router;