const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SLA',{
    //ponemos configuraciones para que el modulo si se actualiza no haya problemas cuando estes haciendo consultas a tu bd 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(db=> console.log('Se conecto a la BD')).catch(err => console.error(err));
