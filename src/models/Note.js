const mongoose=require('mongoose');

const {Schema}= mongoose;

const NoteSchema = new Schema({
    title:{type: String, required:true},
    description: {type:String, required:true},
    priority: {type:String, default: "Baja"},
    status: {type:String, default: "Enviado"},
    solution: {type:String, default: "Pendiente de solución"},
    date:{type:Date, default:Date.now()},
    user:{type: String}
});

module.exports = mongoose.model('Note',NoteSchema)