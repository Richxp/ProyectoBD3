const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://junior:junior123>@proyectobd3.l4goe.mongodb.net/pbd3?retryWrites=true&w=majority',{
    //ponemos configuraciones para que el modulo si se actualiza no haya problemas cuando estes haciendo consultas a tu bd 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(db=> console.log('Se conecto a la BD Mongo')).catch(err => console.error(err));
