const router    = require('express').Router();
const verify = require('./verifyToken');
const {Certif, certif_validation} = require('../models/certif');

/*
router.get('/', verify, (req, res)=>{
    res.json({
        title : 'My First post',
        description : 'random data should not access !'
      });
});
*/
// Display ALL certif
router.get('/', verify, async(req,res)=>{
    let certifs = await Certif.find();
    res.send(certifs);
});


module.exports=router;