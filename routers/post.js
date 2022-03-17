const router    = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res)=>{
    res.json({
        title : 'My First post',
        description : 'random data should not access !'
      });
});

module.exports=router;