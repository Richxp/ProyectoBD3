
const passport= require('passport');

const LocalStrategy=require('passport-local');
const User = require('../models/User');
const { db } = require('../models/User');

passport.use('administrador',new LocalStrategy({
    usernameField:'username'
}, async (username, password, done)=>{
    const user= await User.findOne({username: username});
    if(!user){
        return done(null, false, {message: 'No tienes permisos.'});
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

