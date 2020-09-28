const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const {Schema}= mongoose;

const UserSchema = new Schema({
    firstname:{type: String, required:true},
    lastname:{type: String, required:true},
    doc_id:{type: String, required:true, unique:true},
    username:{type: String, default:null},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    phone:{type: Number, required:false},
    street:{type: String, required:true},
    city:{type: String, required:true},
    country:{type: String, required:true},
    zipcode:{type: String, required:false},
    role:{type: Boolean, default:0},
    path:{type:String,default:null},
    date:{type:Date, default:Date.now}
});

//Metodo para cifrar la contraseña
UserSchema.methods.encryptPassword = async (password) =>{
    //Urilizamos el genSalt  para cifrar 10 veces con el algoritmo hash
    const salt=await bcrypt.genSalt(10);
    const hash=bcrypt.hash(password,salt);
    return hash;
};

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User',UserSchema)