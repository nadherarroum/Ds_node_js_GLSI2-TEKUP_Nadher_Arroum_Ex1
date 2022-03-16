
const express = require('express');
const appDebug = require('debug')('app:debug');
const port = process.env.PORT || 3000;

const app = express();

app.get('/',(req,res)=>{
    res.send({
        firstname:'Nadher',
        lastname:'Arroum',
        education: 'Software Engineering'
    });
});

app.listen(port, ()=>appDebug(`Server run on ${port}`));