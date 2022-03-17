const mongoose = require('mongoose');
const Joi = require('joi');

let student_schema = new mongoose.Schema({
    fname : String,
    lname : String,
    username : String,
    email : String,
    password : String
});

let student_validation = Joi.object({
    fname : Joi.string().min(2).required(),
    lname : Joi.string().min(2).required(),
    username : Joi.string().min(6).required(),
    email : Joi.string().min(10).email().required(),
    password : Joi.string().min(8).required()
});

let Student = mongoose.model('Student',student_schema);

module.exports.Student=Student;
module.exports.student_validation=student_validation;