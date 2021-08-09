const express = require('express')
const router = express.Router();
const Model = require('../models/student.model')
const { debug, findStudent } = require('./utils')

router.use(debug)

router.get('/students', async (req, res) => {
    try {
        const getStudents = await Model.find().exec()
        res.json(getStudents)
    } catch (error) {
        res.status(500).json({ success: false, payload: error })
    }
})

router.get('/students/:name', async (req, res) => {
    try {
        const getStudentName = req.params.name
        const getStudents = await findStudent(getStudentName)
        res.json(getStudents)
    } catch (error) {
        res.status(500).json({ success: false, payload: error })
    }
})

router.get('/students/:name/city', async (req, res) => {
    try {
        const getStudentName = req.params.name
        const getStudentCity = await findStudent(getStudentName)
        if (getStudentCity) {
            res.json({ success: true, payload: `${getStudentCity.city}` })
        } else {
            res.json({ success: false, payload: "Student's city not found !" })
        }
    } catch (error) {
        res.status(500).json({ success: false, payload: error })
    }
})

router.post('/students', async (req, res) => {
    const studentData = req.body
    const newStudent = new Model(studentData)
    try {
        const student = await newStudent.save();
        res.json({ success: true, payload: `${student} is added to StudentsDB` })
    } catch (error) {
        if (error.code === 11000) {
            res.json({ success: false, payload: 'Student exists' })
        } else {
            res.json({ success: false, payload: error })
        }
    }
})

router.post('/student/:name/languages', async (req, res) => {
    try {
        const getStudentName = req.params.name
        const student = await findStudent(getStudentName)
        if (student) {
            const language = req.body.languages;
            student.laguages.push(language)
            await student.save()
            res.json({ success: true, payload: `New ${language} is added to ${student}` })
        } else {
            res.status(400).json({ success: false, payload: `Student was not found` })
        }
    } catch (error) {
        res.status(500).json({ success: false, payload: error })
    }
})

router.put('/students/:name', async (req, res) => {
    try {
        const getStudentName = req.params.name
        const newValuesStudent = req.body
        await Model.replaceOne({ name: getStudentName }, newValuesStudent)
        res.json({ success: true, payload: `${getStudentName} was replaced !` })
    } catch (error) {
        res.status(500).json({ success: false, payload: error })
    }
})

router.delete('/students/:name', async (req, res) => {
    try {
        const getStudentName = req.params.name
        await Model.deleteOne({ name : getStudentName})
        res.json({ success: true, payload: `${getStudentName} Got a DELETE request !` })
    } catch (error) {
        res.status(500).json({ success: false, payload: error })
    }
})

router.all('*', (req, res) => {
    res.json({ message: '404 - Page Not Found' })
})

module.exports = router