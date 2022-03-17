const mongoose = require('mongoose');
const Joi = require('joi');

let certif_schema = new mongoose.Schema({
    title : String,
    instructor: String,
    tags : [String],
    date : {type : Date, default : Date.now()},
    isPublished : Boolean,
    price: Number
});

let certif_validation = Joi.object({
    title : Joi.string().required(),
    instructor: Joi.string(),
    tags : Joi.array().items(Joi.string().min(2)),
    isPublished : Joi.boolean().required(),
    price: Joi.number()
});

let Certif = mongoose.model('Certif',certif_schema);

module.exports.Certif=Certif;
module.exports.certif_validation=certif_validation;