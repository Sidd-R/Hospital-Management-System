let db = require('./db')

const Patients =  {
    
    //read
    async get() {
        try{
            const result = await new Promise((resolve,reject) => {
                const query = 'SELECT * FROM Patients;'
                
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
    async get1(id) {
        try{
            const result = await new Promise((resolve,reject) => {
                const query = 'SELECT firstname,middlename,lastname FROM Patients where patientid = ?;'
                
                db.query(query,[id],(err,result) => {
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
    async post(e) {
        try{
            const response = await new Promise((resolve,reject) =>{
                const query = `INSERT INTO Patients (patientid,FirstName,MiddleName,LastName,EmailId,Address,blood_group,amount_paid) VALUES(?,?,?,?,?,?,?,?);`

                db.query(query,[...e],(err,result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })

            console.log(response);
            return response.affectedRows == 1 ? true : false

        } catch (err) {
            console.log('insert failed!!');
            console.log(new Error(err).message);

            return false
        }
    }
,
    //update
    async update(e) {
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'UPDATE Patients SET FirstName=?, MiddleName=?, LastName=?, EmailId=?, Address=?, blood_group=?, amount_paid=? WHERE patientId=?'
                db.query(query,[...e.slice(1,9),e[0]], (err,result) => {
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
    async deleteId (patientId) {
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'DELETE FROM Patients WHERE patientId = ?'
                db.query(query,[patientId],(err,result) => {
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

module.exports = Patients