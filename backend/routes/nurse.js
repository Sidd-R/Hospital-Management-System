const express = require('express')
let router = express.Router()
const Nurse = require('../database/nurseDb')

router.route('/:id')
    .get((req,res) => {
        const result = Nurse.get()
        
        result.then(data => res.json({data: data})).catch(err => console.log(err))
    })
    .post((req,res) => {
        console.log("insert",req.body);
        const {NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address} = req.body
        const result = Nurse.post(NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address)
        result.then(data => res.json({success: data})).catch(err => console.log(err))
    })
    .patch((req,res) => {
        console.log('update',req.body);
        const {NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address} = req.body
        const result = Nurse.update(NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address)
        result.then(data => res.json({success:data})).catch(err => console.log(err))
    })
    .delete((req,res) => {
        console.log(req.body);
        console.log('delete row with id:',req.body.NurseId)
        const result = Nurse.deleteId(req.body.NurseId)
        result.then(data => res.json({success: data})).catch(err => console.log(err))
    })

module.exports = router