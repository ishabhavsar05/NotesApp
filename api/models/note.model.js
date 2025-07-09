const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    notesImage:{
        type:String,
        default:"https://play-lh.googleusercontent.com/vSNQds6F5roxdN4-a16JnQ9dWQVSZZ8OH4-iMAcNLaFQd3ItZWU8rOPOql4Ew5Hh1esX"
    },
    userId:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
    versionKey:false
})


const Note = mongoose.model('Note', noteSchema);
module.exports = Note;