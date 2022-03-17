require('./connectDB/connect');

const express = require('express');
const appDebug = require('debug')('app:debug');
const port = process.env.PORT || 3000;

const admin_route = require('./routers/admin');
const auth_route = require('./routers/auth');

const app = express();

app.use(express.json());
app.use('/api/v1/user',auth_route);
app.use('/api/v1/admin',admin_route);


app.get('/',(req,res)=>{
    res.send({
        firstname:'Nadher',
        lastname:'Arroum',
        education: 'Software Engineering'
    });
});


app.listen(port, ()=>appDebug(`Server run on ${port}`));