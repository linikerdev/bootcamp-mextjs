
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
});


export default TodoSchema