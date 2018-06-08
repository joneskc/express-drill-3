const express = require('express')
const app = express()
const students = require('./data/students')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())

app.get('/', (req, res) =>{
    res.json({
        data: students
    })
})

function getStudentById(id) {
    for(i = 0; i < students.length; i++) {
        if(students[i].id === +id) {
            return students[i]
        }
    }
    return null
}

app.get('/:id', (req, res, next) => {
    const student = getStudentById(req.params.id)

    if(!student) {
        res.status(404).json({
            message: "No record found!"
        })
    } else {
        return res.json({
            data: student
        })
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
