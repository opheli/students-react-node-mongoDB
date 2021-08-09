const Model = require('../models/student.model');

function debug(req, res, next) {
    const date = new Date().toJSON()
    const { ip, method, path, protocol, httpVersion } = req
    console.log(`Ma requête est lancée : [HTTP] ${ip} - - [${date}] "${method} ${path} ${protocol}/${httpVersion}"`)
    next()
}

const findStudent = async (name) => {
    try {
        return await Model.findOne({ name: name }).exec()
    } catch (err) {
        console.error(err)
    }
}

findStudent()


module.exports = { debug, findStudent }