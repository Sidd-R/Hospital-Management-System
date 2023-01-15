let db = require('./db')

const SurgeonAvailaibility =  {
    
    //read
    async get(id) {
        try{
            const result = await new Promise((resolve,reject) => {
                const query = 'SELECT day FROM Surgeon_Avail where sur_id = ?;'
                id = Number(id)
                
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
    //create
    // async post(e) {
    //     try{
    //         const response = await new Promise((resolve,reject) =>{
    //             const query = `INSERT INTO SurgeonAvailaibility (surId,DOJ,FirstName,MiddleName,LastName,EmailId,Address,Specialization,Salary) VALUES(?,?,?,?,?,?,?,?,?);`

    //             db.query(query,[...e],(err,result) => {
    //                 if (err) reject(new Error(err.message))
    //                 resolve(result)
    //             })
    //         })

    //         console.log(response);
    //         return response.affectedRows == 1 ? true : false

    //     } catch (err) {
    //         console.log('insert failed!!');
    //         console.log(new Error(err).message);

    //         return false
    //     }
    // }
}

module.exports = SurgeonAvailaibility