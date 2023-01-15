const Surgeries = require('../database/surgeriesDb')
let router = require('express').Router()

router.route('/:id')
    .get((req,res) => {
        if (req.params.id != '-') Surgeries.get1(req.params.id).then(data => res.json({data: data})).catch(err => console.log(err))
        else Surgeries.get().then(data => res.json({data: data})).catch(err => console.log(err))
    })
    .post((req,res) => {
        console.log("insert",req.body);
        Surgeries.post(Object.values(req.body)).then(data => res.json({success: data})).catch(err => console.log(err))  
    })
    .patch((req,res) => {
        console.log('update',req.body);
        Surgeries.update(Object.values(req.body)).then(data => res.json({success:data})).catch(err => console.log(err))
        const temp = Object.values(req.body).slice()
    })
    .delete((req,res) => {
        console.log('delete row with id:',req.params.id)
        const result = Surgeries.deleteId(req.params.id)
        result.then(data => res.json({success: data})).catch(err => console.log(err))
    })

module.exports = router