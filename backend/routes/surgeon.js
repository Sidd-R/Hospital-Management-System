const Surgeon = require('../database/surgeonDb')
let router = require('express').Router()

router.route('/:id')
    .get((req,res) => {
        if (req.params.id != '-') Surgeon.get1(req.params.id).then(data => res.json({data: data})).catch(err => console.log(err));
        else Surgeon.get().then(data => res.json({data: data})).catch(err => console.log(err))
    })
    .post((req,res) => {
        console.log("insert",req.body);
        Surgeon.post(Object.values(req.body)).then(data => res.json({success: data})).catch(err => console.log(err))  
    })
    .patch((req,res) => {
        console.log('update',req.body);
        Surgeon.update(Object.values(req.body)).then(data => res.json({success:data})).catch(err => console.log(err))
    })
    .delete((req,res) => {
        console.log('delete row with id:',req.body.SurId)
        const result = Surgeon.deleteId(req.body.SurId)
        result.then(data => res.json({success: data})).catch(err => console.log(err))
    })

module.exports = router