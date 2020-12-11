const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

router.post('/register',[

    check('name', 'Por favor insira um nome de usuário válido').isLength({min: 4}),
    check('password', 'Insira uma senha como mínimo 6 letras').isLength({min: 4}),
    check('email', 'Insira um email válido').isEmail(),
    
], async (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) {
        return res.status(400).json({error: "Email is already exists"});
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try{
        const savedUsed = await user.save();
        res.send({
            user: user._id
        });
    }catch(err){
        res.status(400).send(err.message);
    }
});

router.post('/login',[ 
    check('name', 'Insert a valid name...').isLength({min: 4}),
    check('password', 'Insira uma senha como mínimo 6 letras').isLength({min: 4}),
 ], async (req,res)=>{

     //Checking if the user exists
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
        return res.status(400).json({error: "Name or password is wrong"});
    }
    //Password is wrong
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).send({error: 'Name or password is wrong'}); 

    //Create and assign a token
    const token = await jwt.sign({_id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({
        token: token,
        message: "logado",
     });

})


module.exports = router;