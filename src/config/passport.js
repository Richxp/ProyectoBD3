const passport= require('passport');

const LocalStrategy=require('passport-local');
const User = require('../models/User');


//Autenticacion local de usuarios por defecto te lo guarda como local
passport.use('usuario',new LocalStrategy({
    usernameField:'email'
}, async (email, password, done)=>{
    const user= await User.findOne({email: email});
    if(!user){
        return done(null, false, {message: 'Not User found.'});
    } else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null,false, {message:'Incorrect Password'});
        }
    }
}
));

//Mantener sesiones
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    });
});