const express = require('express');
const notesController = require('../controllers/note.controller');
const CheackIsAuth = require('../middleware/auth');
const notesRouter = express.Router()

notesRouter.get('/test',notesController.test)
notesRouter.post('/create',CheackIsAuth,notesController.create)
notesRouter.get('/note/:noteId',CheackIsAuth,notesController.getById)
notesRouter.patch('/update/:noteId',CheackIsAuth,notesController.update)
notesRouter.delete('/delete/:noteId',CheackIsAuth,notesController.delete)




module.exports = notesRouter;