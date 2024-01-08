const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const app = express();
const port = 4000;

const bycryptSalt = bycrypt.genSaltSync(10);
const jwtSecrete = "ajkgaidgakafavghayuey";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json("test axios");
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try
    {
        const userDoc = await User.create({
            name,
            email,
            password: bycrypt.hashSync(password, bycryptSalt)
        });
        res.json(userDoc);
    }
    catch (e)
    {
        res.status(422).json(e);
    }

});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user)
    {
        const isOk = bycrypt.compareSync(password, user.password);
        if (isOk)

        {

     jwt.sign({email: user.email, id: user._id}, jwtSecrete, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user);
});
         

            //logged in
            
        }
        else
        {
            res.status(422).json('Password is wrong');
        }
    }
    else
    {
        res.status(404).json('User not found');
    }
    
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
    
       jwt.verify(token, jwtSecrete, {}, async (err, userData) => {
           if (err) throw err;
          const {name, email, _id} = await User.findById(userData.id)
        
           res.json({name, email, _id});
       })
    }else{
        res.json(null);
    }
    
})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})