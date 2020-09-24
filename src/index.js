const express = require('express');
const path  = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash= require('connect-flash');
const passport = require('passport');

//Adicionales para la foto y fechas
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const {format}=require('timeago.js');

//INITLIAZATIONS
const app = express();
require('./database');
require('./config/passport');
require('./config/passadmi');

//Para poder utilizar los metodos de read y update 
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

//Dividimos el codigo en 3 secciones

//SETTINGS
app.set('port', process.env.PORT|| 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    //todo lo principal de las paginas 
    defaultLayout: 'main',
    //se le da la direccion donde esta la carpeta con lo principal
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //carpeta donde estara codigo reutilizable de html para reutilizar en cualquier vista  poniendolo en un archivo hbs
    partialsDir: path.join(app.get('views'), 'partials'),
    //que extension tendran todos nuestros archivos
    extname: '.hbs',
    helpers: require('./helpers')
}));
// para utilizar el motor de plantilla se usa el siguiente comando 
app.set('view engine', '.hbs');

//MIDDLEWARES
//sirve apra poder recibir los datos para registrarse
app.use(express.urlencoded({extended: false}));
//sirve para poder enviar otros metodos que no sean post y get ,tambien delete, put
app.use(methodOverride('_method'));
//con esto nos ayuda a poder guardar las sessiones de los usuarios temporalmente 
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized:true
}));
//Iniciar la autenticacion y la sesion con el passport
app.use(passport.initialize());
app.use(passport.session());
//Para manejar los mensajes de alerta
app.use(flash());

//global variables
app.use((req,res, next)=>{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    res.locals.user=req.user || null;
    //res.locals.format=format;
    //res.locals.admi=req.admi || null;
    next();
})

//ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//server is listenning
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});