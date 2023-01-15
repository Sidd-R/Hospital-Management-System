let db = require('./db')

const Nurse =  {
    //read
    async get() {
        try{
            const result = await new Promise((resolve,reject) => {
                const query = 'SELECT * FROM nurses;'
                
                db.query(query,(err,result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })

            return result
        } catch (err) {
            console.log(err);
        }
    }
,
    //create
    async post(NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address) {
        try{
            const response = await new Promise((resolve,reject) =>{
                const query = `INSERT INTO nurses (NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address) VALUES(?,?,?,?,?,?,?,?);`

                db.query(query,[NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address],(err,result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            console.log(response);
            return response.affectedRows == 1 ? true : false
            // return {
            //     id: result.insertId,
            //     name: name,
            //     date_added: date_added
            // }
        } catch (err) {
            console.log('insert failed!!');
            console.log(new Error(err).message);
            return false
        }
    }
,
    //update
    async update(NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address) {
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'UPDATE nurses SET First_Name = ?, Middle_Name = ?, Last_Name = ?, Salary = ?, DOJ = ?, Email_Id = ?, Address = ? WHERE NurseId = ?'
                let sal = parseInt(Salary)
                let id = parseInt(NurseId)
                db.query(query,[First_Name,Middle_Name,Last_Name,sal,DOJ,Email_Id,Address,id], (err,result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            if (response.affectedRows == 0) console.log('update failed!!');
            return response.affectedRows == 1 ? true : false
        } catch (err) {
            console.log('update failed!!');
            console.log(new Error(err).message);
            return false
        }
    }
,
    //delete
    async deleteId (NurseId) {
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'DELETE FROM nurses WHERE NurseId = ?'
                db.query(query,[NurseId],(err,result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            if (response.affectedRows == 0) console.log('delete failed!!');
            return response.affectedRows == 1 ? true : false
        } catch (err) {
            console.log('delete failed!!');
            console.log(new Error(err).message);
            return false
        }

    }
}

module.exports = Nurse