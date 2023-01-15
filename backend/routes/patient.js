const Patients = require('../database/patientDb')
let router = require('express').Router()

router.route('/:id')
    .get((req,res) => {
        if (req.params.id != '-') Patients.get1(req.params.id).then(data => res.json({data: data})).catch(err => console.log(err));
        else Patients.get().then(data => res.json({data: data})).catch(err => console.log(err))
    })
    .post((req,res) => {
        console.log("insert",req.body);
        Patients.post(Object.values(req.body)).then(data => res.json({success: data})).catch(err => console.log(err))  
    })
    .patch((req,res) => {
        console.log('update',req.body);
        Patients.update(Object.values(req.body)).then(data => res.json({success:data})).catch(err => console.log(err))
        const temp = Object.values(req.body).slice()
    })
    .delete((req,res) => {
        console.log('delete row with id:',req.body.PatientId)
        const result = Patients.deleteId(req.body.PatientId)
        result.then(data => res.json({success: data})).catch(err => console.log(err))
    })

module.exports = router