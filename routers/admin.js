const router    = require('express').Router();
const { route } = require('express/lib/application');
const req       = require('express/lib/request');
const {Certif, certif_validation} = require('../models/certif');

// Test to Display 
router.get('/test',(req,res)=>{
    res.send({
        test:"Hello World !"
    });
});

// Display ALL certif
router.get('/certifs',async(req,res)=>{
    let certifs = await Certif.find();
    res.send(certifs);
});

// ADD new certifications
router.post('/certif/add',async (req,res)=>{
    let validation_res = certif_validation.validate(req.body);
    if (validation_res.error) {
        return res.status(400).send(validation_res.error.details[0].message);
    }

    let certif = new Certif(req.body);
    certif = await certif.save();
    res.send(certif);
});

// Search certif by title
router.get('/certif/:title', async(req, res)=>{
    let title = req.params.title;
    let certif = await Certif.find({title : title});
    res.send(certif);
});

module.exports=router;