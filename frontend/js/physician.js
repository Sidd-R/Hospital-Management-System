document.addEventListener('DOMContentLoaded',async () => {
    await fetch('http://localhost:5000/physician ').then(res => res.json()).then(data => {
        fillTable(data['data'])
        console.log(data['data'])}
    )

    // await fetch('http://localhost:5000/physician').then(res => res.json()).then(data => {
        // fillTable(data['data'])
        // console.log(data)
    // })
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
                        <th scope="row">${e.PhyId}</th>
                        <td >${e.FirstName +" "+ e.MiddleName +" "+ e.LastName}</td>
                        <td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" data-id="${e.PhyId}" id="view">view</button></td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${e.PhyId}" id="edit">edit</button></td>
                        <td><button class="btn btn-danger" data-id="${e.PhyId}" id="delete">delete</button></td>
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
                PhyId: e.target.dataset.id,
                DOJ: document.getElementById('date').value,
                FirstName: document.getElementById('fn').value,
                MiddleName: document.getElementById('mn').value,
                LastName: document.getElementById('ln').value,
                EmailId: document.getElementById('email').value,
                Address: document.getElementById('address').value,
                Specialization: document.getElementById('sp').value,
                Salary: document.getElementById('salary').value
            })
        }
    } else if (e.target.id == 'view') {
        console.log(e.target.dataset.id,'hi');
        list.forEach(k => {
            if (k.PhyId == e.target.dataset.id) {
                console.log(k);
                document.getElementById('fn1').innerHTML = k.FirstName
                document.getElementById('mn1').innerHTML = k.MiddleName
                document.getElementById('ln1').innerHTML = k.LastName
                document.getElementById('salary1').innerHTML = k.Salary
                document.getElementById('date1').innerHTML = k.DOJ
                document.getElementById('email1').innerHTML = k.EmailId
                document.getElementById('address1').innerHTML = k.Address
                document.getElementById('id1').innerHTML = k.PhyId
                document.getElementById('sp1').innerHTML = k.Specialization
            }
        })
    }
})

document.getElementById('modal-save1').onclick = () => {
    const nurse = {
        PhyId: parseInt(document.getElementById('id2').value),
        DOJ: document.getElementById('date2').value,
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

const post = ({PhyId,FirstName,MiddleName,LastName,Salary,DOJ,EmailId,Address,Specialization}) => {
    fetch('http://localhost:5000/physician',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            PhyId: PhyId,
            DOJ: DOJ,
            FirstName: FirstName,
            MiddleName: MiddleName,
            LastName: LastName,
            EmailId: EmailId,
            Address: Address,
            Specialization: Specialization,
            Salary: Salary
        })
    }).then(res => res.json()).then(data => {
        if (data.success) {
            window.alert('post successfull')
            location.reload()
        } else window.alert('post failed!!')
    })
}

const update = ({PhyId,FirstName,MiddleName,LastName,Salary,DOJ,EmailId,Address,Specialization}) => {
    fetch('http://localhost:5000/physician', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            PhyId: PhyId,
            DOJ: DOJ,
            FirstName: FirstName,
            MiddleName: MiddleName,
            LastName: LastName,
            EmailId: EmailId,
            Address: Address,
            Specialization: Specialization,
            Salary: Salary
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

const deleteId = (PhyId) => {
    fetch('http://localhost:5000/physician',{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({phyId: PhyId})
    }).then(res => res.json()).then(data => {
        if (data.success) {
            // location.reload()
            list = list.filter(e => {
                // console.log(e);
                // console.log(e.id);
                 return e.PhyId != PhyId ? true: false
            })
            
            fillTable(list);
            window.alert('delete successfull')
        } else {
            window.alert('unable to delete')
        }
    })
    // console.log(PhyId,'id');
}

