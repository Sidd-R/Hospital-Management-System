let db = require('./db')

const Physician =  {
    
    //read
    async get() {
        try{
            const result = await new Promise((resolve,reject) => {
                const query = 'SELECT * FROM physician;'
                
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
    async post(e) {
        try{
            const response = await new Promise((resolve,reject) =>{
                const query = `INSERT INTO physician (phyId,DOJ,FirstName,MiddleName,LastName,EmailId,Address,Specialization,Salary) VALUES(?,?,?,?,?,?,?,?,?);`

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
                const query = 'UPDATE physician SET DOJ=?, FirstName=?, MiddleName=?, LastName=?, EmailId=?, Address=?, Specialization=?, Salary=? WHERE phyId=?'
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
    async deleteId (phyId) {
        try {
            const response = await new Promise((resolve,reject) => {
                const query = 'DELETE FROM physician WHERE phyId = ?'
                db.query(query,[phyId],(err,result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })

            if (response.affectedRows == 0) console.log('delete failed!!',2);
            
            return response.affectedRows == 1 ? true : false

        } catch (err) {
            console.log('delete failed!!',1);
            console.log(new Error(err).message);

            return false
        }

    }
}

module.exports = Physician