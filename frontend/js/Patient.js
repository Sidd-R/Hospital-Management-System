document.addEventListener('DOMContentLoaded',async () => {
    await fetch('http://localhost:5000/patients/- ').then(res => res.json()).then(data => {
        fillTable(data['data'])
        console.log(data['data'])}
    )
})

let list = []

const fillTable = data =>{
    list = data
    const table = document.querySelector("table tbody")
    if (data.length == 0) table.innerHTML = "<tr><td colspan='5' class='bg-danger text-center'>No data</td></tr>"
    else {
        isEmpty = false
        let temp = ""
        data.forEach(e => {
            temp += `<tr>
                        <th scope="row">${e.PatientId}</th>
                        <td >${e.FirstName +" "+ e.MiddleName +" "+ e.LastName}</td>
                        <td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" data-id="${e.PatientId}" id="view">view</button></td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${e.PatientId}" id="edit">edit</button></td>
                        <td><button class="btn btn-danger" data-id="${e.PatientId}" id="delete">delete</button></td>
                    </tr>`
        });
        table.innerHTML = temp
    }
}

document.querySelector("table tbody").addEventListener('click', e => {
    console.log(e.target.dataset.id);
    if (e.target.id == "delete") {
        deleteId(e.target.dataset.id)
    } else if (e.target.id == "edit") {
        document.getElementById('modal-save').onclick = () => {
            update({
                PatientId: e.target.dataset.id,
                FirstName: document.getElementById('fn').value,
                MiddleName: document.getElementById('mn').value,
                LastName: document.getElementById('ln').value,
                EmailId: document.getElementById('email').value,
                Address: document.getElementById('address').value,
                Blood_Group: document.getElementById('sp').value,
                Salary: document.getElementById('salary').value
            })
        }
    } else if (e.target.id == 'view') {
        console.log(e.target.dataset.id,'hi');
        list.forEach(k => {
            if (k.PatientId == e.target.dataset.id) {
                console.log(k);
                document.getElementById('fn1').innerHTML = k.FirstName
                document.getElementById('mn1').innerHTML = k.MiddleName
                document.getElementById('ln1').innerHTML = k.LastName
                document.getElementById('salary1').innerHTML = k.Amount_Paid
                document.getElementById('email1').innerHTML = k.EmailId
                document.getElementById('address1').innerHTML = k.Address
                document.getElementById('id1').innerHTML = k.PatientId
                document.getElementById('sp1').innerHTML = k.Blood_Group
            }
        })
    }
})

document.getElementById('modal-save1').onclick = () => {
    const nurse = {
        PatientId: parseInt(document.getElementById('id2').value),
        FirstName: document.getElementById('fn2').value,
        MiddleName: document.getElementById('mn2').value,
        LastName: document.getElementById('ln2').value,
        EmailId: document.getElementById('email2').value,
        Address: document.getElementById('address2').value,
        Specialization: document.getElementById('sp2').value,
        Salary: document.getElementById('salary2').value
}

    post(nurse)

    console.log(nurse);
}

const post = ({PatientId,FirstName,MiddleName,LastName,Salary,EmailId,Address,Specialization}) => {
    fetch('http://localhost:5000/patients/-',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            PatientId: PatientId,
            FirstName: FirstName,
            MiddleName: MiddleName,
            LastName: LastName,
            EmailId: EmailId,
            Address: Address,
            Blood_Group: Specialization,
            Amount_Paid: Salary
        })
    }).then(res => res.json()).then(data => {
        if (data.success) {
            window.alert('post successfull')
            location.reload()
        } else window.alert('post failed!!')
    })
}

const update = ({PatientId,FirstName,MiddleName,LastName,Salary,EmailId,Address,Specialization}) => {
    fetch('http://localhost:5000/patients/-', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            PatientId: PatientId,
            FirstName: FirstName,
            MiddleName: MiddleName,
            LastName: LastName,
            EmailId: EmailId,
            Address: Address,
            Blood_Group: Specialization,
            Amount_Paid: Salary
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.alert('update successfull')
            location.reload();
        } else {
            window.alert('update failed')
        }
    })
}

const deleteId = (PatientId) => {
    fetch('http://localhost:5000/patients/-',{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({PatientId: PatientId})
    }).then(res => res.json()).then(data => {
        if (data.success) {
            list = list.filter(e => {
                 return e.PatientId != PatientId ? true: false
            })
            
            fillTable(list);
            window.alert('delete successfull')
        } else {
            window.alert('unable to delete')
        }
    })
    // console.log(PatientId,'id');
}

