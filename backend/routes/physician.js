let router = require('express').Router()
const Physician = require('../database/physicianDb')

router.route('/')
    .get((req,res) => {
        Physician.get().then(data => res.json({data: data})).catch(err => console.log(err))
    })
    .post((req,res) => {
        console.log("insert",req.body);
        Physician.post(Object.values(req.body)).then(data => res.json({success: data})).catch(err => console.log(err))  
    })
    .patch((req,res) => {
        console.log('update',req.body);
        Physician.update(Object.values(req.body)).then(data => res.json({success:data})).catch(err => console.log(err))
        const temp = Object.values(req.body).slice()
    })
    .delete((req,res) => {
        console.log('delete row with id:',req.body.phyId)
        const result = Physician.deleteId(req.body.phyId)
        result.then(data => res.json({success: data})).catch(err => console.log(err))
    })

module.exports = router