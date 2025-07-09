const express = require('express');
const connectToDb = require('./utilis/db');
const userRouter = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const notesRouter = require('./routes/note.route');

require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);

app.listen(port, async () => {
    try {
        await connectToDb();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.log(`Error starting server: ${error.message}`);

    }

})