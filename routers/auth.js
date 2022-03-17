const router    = require('express').Router();
const bcrypt = require('bcryptjs');
const { route } = require('express/lib/application');
const req       = require('express/lib/request');
const {Student, student_validation, login_validation} = require('../models/student');

// SingUp - Register - New Student
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

// Sign in - Login
router.post('/login',async (req, res)=>{
    // Validate the data before
    let validation_res = login_validation.validate(req.body);
    if (validation_res.error)
        return res.status(400).send(validation_res.error.details[0].message);
    // Checking if email exists
    const student = await Student.findOne({email : req.body.email});
    if (!student)
        return res.status(400).send('Email not found!');
    // If password is correct
    const validPass = await bcrypt.compare(req.body.password, student.password);
    if(!validPass)
        return res.status(400).send('Invalid password!');
    
    res.send('Logged In !');

});


module.exports=router;