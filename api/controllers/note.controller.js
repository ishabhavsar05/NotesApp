const Note = require("../models/note.model")

const notesController = {
    test: (req, res) => {
        res.status(200).json({
            message: "Notes Controller is Working"
        })
    },
    create: async (req, res) => {
        console.log("Request Body", req.user._id);

        if (!req.body.title || !req.body.content) {
            return res.status(400).json({
                message: "Title and content are required"
            })
        }

        try {
            const notes = Note.create({ ...req.body, userId: req?.user?._id })
            res.status(201).json({ message: "Note created Successfully" })

        } catch (error) {
            console.error("error creating note".error)
            return res.status(500).json({
                message: error.message || "Internal Server Error"
            })
        }
    },

    getById: async (req, res) => {
        const { noteId } = req.params;
        if (!noteId) {
            return res.status(400).json({
                message: "Note ID is required"
            })
        }

        try {
            const IsExistNotes = await Note.findOne({ _id: noteId });
            if (!IsExistNotes) {
                return res.status(404).json({
                    message: "Note not found"
                })
            }

            if (IsExistNotes.userId !== req.user._id) {
                return res.status(403).json({
                    message: "You are not authorized to access this note"
                })
            }
            res.status(200).json({
                message: "Note fetched successfully",
                note: IsExistNotes
            })




        } catch (error) {
            console.log("error getting note by id", error.message);
            return res.status(500).json({
                message: error.message || "Internal Server Error"
            })

        }
    },
    update: async (req, res) => {
        const { noteId } = req.params;

        if(req.body.userId || req.body.notesImage){
            return res.status(400).json({
                message: "You are not allowed to update userId"
            })
        }
        if (!noteId) {
            return res.status(400).json({
                message: "Note ID is required"
            })
        }


        try {
            const IsExistNotes = await Note.findOne({ _id: noteId });
            if (!IsExistNotes) {
                return res.status(404).json({
                    message: "Note not found"
                })
            }

            await Note.findByIdAndUpdate({ _id: noteId }, { $set: { ...req.body } });
            res.status(200).json({
                message: "Note updated successfully",
            })
            if (IsExistNotes.userId !== req.user._id) {
                return res.status(403).json({
                    message: "You are not authorized to access this note"
                })
            }

        } catch (error) {
            console.log("error getting note by id", error.message);
            return res.status(500).json({
                message: error.message || "Internal Server Error"
            })
        }

        // try {
        //     const IsExistNotes = await Note.findOne({_id:noteId});
        //     if(!IsExistNotes){
        //         return res.status(404).json({
        //             message:"Note not found"
        //         })
        //     }

        //     if(IsExistNotes.userId !== req.user._id){
        //         return res.status(403).json({
        //             message:"You are not authorized to access this note"
        //         })
        //     }

        //     const updatedNote = await Note.findByIdAndUpdate(noteId,req.body,{new:true});
        //     res.status(200).json({
        //         message:"Note updated successfully",
        //         note:updatedNote
        //     })

        // } catch (error) {
        //     console.log("error updating note",error.message);
        //     return res.status(500).json({
        //         message:error.message || "Internal Server Error"
        //     })
        // }
    },
    delete: async (req, res) => {
        const { noteId } = req.params;

        if (!noteId) {
            return res.status(400).json({
                message: "Note ID is required"
            })
        }

        try {
            const IsExistNotes = await Note.findOne({ _id: noteId });
            if (!IsExistNotes) {
                return res.status(404).json({
                    message: "Note not found"
                })
            }

            if (IsExistNotes.userId !== req.user._id) {
                return res.status(403).json({
                    message: "You are not authorized to access this note"
                })
            }

            await Note.findByIdAndDelete(noteId);
            res.status(200).json({
                message: "Note deleted successfully",
            })

        } catch (error) {
            console.log("error deleting note", error.message);
            return res.status(500).json({
                message: error.message || "Internal Server Error"
            })
        }
    }
}








module.exports = notesController



// getall (specific to user)
// getbyid (specific to user by id)
// update (specific to user by id)
// delete (specific to user by id)