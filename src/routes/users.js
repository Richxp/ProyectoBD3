/*const router = require('express').Router();*/
const express = require('express');
const router = express.Router();

const User= require('../models/User');

const passport = require('passport');

//METODOS USUARIO

//Mostrar vista del formulario de login de usuario
router.get('/users/signin', (req, res)=>{
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('usuario', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res)=>{
    res.render('users/signup');
});

router.post('/users/signup', async (req,res)=>{
    const {firstname,lastname,doc_id,email,password,confirm_password,phone,street,city,country,zipcode}= req.body;
    const errors=[];
    if(firstname.length<=0){
        errors.push({text:'Please insert your firstname'})
    }
    if(lastname.length<=0){
        errors.push({text:'Please insert your lastname'})
    }
    if(doc_id.length<=0){
        errors.push({text:'Please insert your number of identication'})
    }
    if(street.length<=0){
        errors.push({text:'Please insert your street'})
    }
    if(city.length<=0){
        errors.push({text:'Please insert your city'})
    }
    if(country.length<=0){
        errors.push({text:'Please insert your country'})
    }
    if(password != confirm_password){
        errors.push({text:'Password do not match'});
    }
    if(password.length<4){
        errors.push({text:'Password must be at least 4 characters'});
    }
    if(errors.length>0){
        res.render('users/signup',{errors,firstname,lastname,doc_id,email,password,confirm_password,phone,street,city,country,zipcode});
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'The Email is already in use');
            res.redirect('/users/signup');
        }else{
            const newUser=new User({firstname,lastname,doc_id,email,password,phone,street,city,country,zipcode});
            newUser.password= await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }
});



//METODOS ADMINISTRADOR

//Mostrar vista del formulario de login de administrador
router.get('/users/signinA', (req, res)=>{
    res.render('users/signinA');
});

router.post('/users/signinA', passport.authenticate('administrador', {
    successRedirect: '/notesA',
    failureRedirect: '/users/signinA',
    failureFlash: true
}));


//METODO DE LOGOUT
router.get('/users/logout', (req,res)=>{
    req.logOut();
    res.redirect('/');
})
module.exports = router;