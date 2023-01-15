let db = require('./db')

Surgeries =  {
    
    //read
    async get() {
        try{
            const result = await new Promise((resolve,reject) => {
                const query = 'SELECT * FROM Surgeries;'
                
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
                const query = 'SELECT * FROM Surgeries where sur_id = ?;'
                
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
                const query = `INSERT INTO Surgeries (Name,sur_id,p_id,date,fees) VALUES(?,?,?,?,?);`
                // { sid: 4003, pid: 2001, date: '7/11/2022', fees: 22222 }
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
                const query = 'UPDATE Surgeries SET DOJ=?, FirstName=?, MiddleName=?, LastName=?, EmailId=?, Address=?, Specialization=?, Salary=? WHERE surId=?'
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
    async deleteId (surId) {
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'DELETE FROM Surgeries WHERE surgery_id = ?'
                db.query(query,[surId],(err,result) => {
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

module.exports = Surgeries