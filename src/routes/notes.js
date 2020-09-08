/*const router = require('express').Router();*/
const express = require('express');
const router = express.Router();

//con esto podremos hacer el CRUD basico
const Note = require('../models/Note');

const {isAuthenticated}=require('../helpers/auth');

//Reclamos ingresados
router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/new-note');
});

//CREAR RECLAMOS
router.post('/notes/new-note' , isAuthenticated, async (req,res)=>{
    const {title,description,priority,status}= req.body;
    const errors= [];
    if(!title){
        errors.push({text: 'Please write a Title'});
    }
    if(!description){
        errors.push({text: 'Please write a description'});
    }
    if(errors.length>0){
        res.render('notes/new-note', {
            errors,
            title,
            description,
            priority,
            status
        });
    }else{
        const newNote = new Note({title,description,priority,status});
        //guardar el dato dentro de la BD
        newNote.user=req.user.id;
        await newNote.save();
        req.flash('success_msg','Note Added Succesfully');
        res.redirect('/notes');
    }
});

//MOSTRAR RECLAMOS POR USUARIOS
router.get('/notes',isAuthenticated, async (req, res)=>{
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

//MOSTRAR PANTALLA DE BUSQUEDA DE ADMINISTRADORES
router.get('/notesA',isAuthenticated, async (req, res)=>{
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notesA/admi-init', { notes });
});

//EDITAR RECLAMOS POR USUARIOS
router.get('/notes/edit/:id',isAuthenticated, async (req,res)=>{
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', {note})
});

//EDITAR RECLAMOS POR USUARIOS
router.put('/notes/edit-note/:id',isAuthenticated, async (req,res)=>{
    const {title, description}=req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    req.flash('success_msg', 'Note Updated Successfuly');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated, async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfuly');
    res.redirect('/notes');
});
/*
router.get('/notes', async (req, res) => {
    await Note.find()
      .then(documentos => {
        const contexto = {
            notes: documentos.map(documento => {
            return {
                title: documento.title,
                description: documento.description
            }
          })
        }
        res.render('notes/all-notes', {notes: contexto.notes }) 
      })
  }); 
*/


module.exports = router;