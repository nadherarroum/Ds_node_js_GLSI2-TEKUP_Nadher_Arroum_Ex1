const router = require('express').Router();
const { route } = require('express/lib/application');
const req = require('express/lib/request');

// Test to Display 
router.get('',(req,res)=>{
    res.send({
        test:"Hello World !"
    });
});

module.exports=router;