const express = require('express')
const app = express()
require('dotenv').config()

const nurse = require('./routes/nurse')
const physician = require('./routes/physician')

app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/nurse',nurse)
app.use('/physician',physician)
app.use('/surgeon',require('./routes/surgeon'))
app.use('/surgeries',require('./routes/surgeries'))
app.use('/patients',require('./routes/patient'))
app.use('/surgeonAvailaibility',require('./routes/surgeonAvailaibility'))

app.listen(5000)