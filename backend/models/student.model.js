const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    languages : [String],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("student", StudentSchema)