const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const {Schema}= mongoose;

const UserSchema = new Schema({
    name:{type: String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
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