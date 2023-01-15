const SurgeonAvailaibility = require('../database/surgeonAvailaibilityDb')
let router = require('express').Router()

router.route('/:id')
    .get((req,res) => {
        SurgeonAvailaibility.get(req.params.id).then(data => res.json({data: data})).catch(err => console.log(err));
    })
    .post((req,res) => {
        console.log("insert",req.body);
        SurgeonAvailaibility.post(Object.values(req.body)).then(data => res.json({success: data})).catch(err => console.log(err))  
    })
    .patch((req,res) => {
        console.log('update',req.body);
        SurgeonAvailaibility.update(Object.values(req.body)).then(data => res.json({success:data})).catch(err => console.log(err))
        // const temp = Object.values(req.body).slice()
    })
    .delete((req,res) => {
        console.log('delete row with id:',req.body.SurId)
        const result = SurgeonAvailaibility.deleteId(req.body.phyId)
        result.then(data => res.json({success: data})).catch(err => console.log(err))
    })

module.exports = router