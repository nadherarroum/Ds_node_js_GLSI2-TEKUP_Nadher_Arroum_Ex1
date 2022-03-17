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

// Update certif 
router.put('/certif/:title',async (req,res)=>{
    // Find certif
    let title = req.params.title;
    let certif = await Certif.find({title : title});
    // Return 404 if not existing
    if(!certif)
        res.status(404).send('The certif you look for is not found !');
    // Validate
    let validation_res = certif_validation.validate(req.body);
    // Return 400 - Bad request if it's invalid
    if (validation_res.error) {
        return res.status(400).send(validation_res.error.details[0].message);
    }
    // Update certif
    let cert = new Certif(req.body);
    cert = await cert.save();
    // Return the updated certif
    res.send(cert);
    
});


module.exports=router;