const express = require('express');
const userController = require('../controllers/user.controller');

const app = express();

const userRouter = express.Router();

userRouter.get('/test',userController.test)
userRouter.post('/register',userController.register)
userRouter.post('/signin',userController.signin)




module.exports = userRouter;