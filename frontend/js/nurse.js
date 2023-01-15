document.addEventListener('DOMContentLoaded',async () => {
    await fetch('http://localhost:5000/nurse/-').then(res => res.json()).then(data => {
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
                        <th scope="row">${e.NurseId}</th>
                        <td >${e.First_Name +" "+ e.Middle_Name +" "+ e.Last_Name}</td>
                        <td><button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" data-id="${e.NurseId}" id="view">view</button></td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${e.NurseId}" id="edit">edit</button></td>
                        <td><button class="btn btn-danger" data-id="${e.NurseId}" id="delete">delete</button></td>
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
                NurseId: e.target.dataset.id,
                First_Name: document.getElementById('fn').value,
                Middle_Name: document.getElementById('mn').value,
                Last_Name: document.getElementById('ln').value,
                Salary: document.getElementById('salary').value,
                DOJ: document.getElementById('date').value,
                Email_Id: document.getElementById('email').value,
                Address: document.getElementById('address').value
            })
        }
    } else if (e.target.id == 'view') {
        console.log(e.target.dataset.id,'hi');
        list.forEach(k => {
            if (k.NurseId == e.target.dataset.id) {
                console.log(k);
                document.getElementById('fn1').innerHTML = k.First_Name
                document.getElementById('mn1').innerHTML = k.Middle_Name
                document.getElementById('ln1').innerHTML = k.Last_Name
                document.getElementById('salary1').innerHTML = k.Salary
                document.getElementById('date1').innerHTML = k.DOJ
                document.getElementById('email1').innerHTML = k.Email_Id
                document.getElementById('address1').innerHTML = k.Address
                document.getElementById('id1').innerHTML = k.NurseId
            }
        })
    }
})

document.getElementById('modal-save1').onclick = () => {
    const nurse = {
        NurseId: parseInt(document.getElementById('id2').value),
        First_Name: document.getElementById('fn2').value,
        Middle_Name: document.getElementById('mn2').value,
        Last_Name: document.getElementById('ln2').value,
        Salary: parseInt(document.getElementById('salary2').value),
        DOJ: document.getElementById('date2').value,
        Email_Id: document.getElementById('email2').value,
        Address: document.getElementById('address2').value
    }

    post(nurse)

    console.log(nurse);
}

const post = ({NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address}) => {
    fetch('http://localhost:5000/nurse',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            NurseId: NurseId,
            First_Name: First_Name,
            Middle_Name: Middle_Name,
            Last_Name: Last_Name,
            Salary: Salary,
            DOJ: DOJ,
            Email_Id: Email_Id,
            Address: Address
        })
    }).then(res => res.json()).then(data => {
        if (data.success) {
            window.alert('post successfull')
            location.reload()
        } else window.alert('post failed!!')
    })
}

const update = ({NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address}) => {
    fetch('http://localhost:5000/nurse', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            NurseId: NurseId,
            First_Name: First_Name,
            Middle_Name: Middle_Name,
            Last_Name: Last_Name,
            Salary: Salary,
            DOJ: DOJ,
            Email_Id: Email_Id,
            Address: Address
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

const deleteId = (NurseId) => {
    fetch('http://localhost:5000/nurse',{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({NurseId: NurseId})
    }).then(res => res.json()).then(data => {
        if (data.success) {
            // location.reload()
            list = list.filter(e => {
                // console.log(e);
                // console.log(e.id);
                 return e.NurseId != NurseId ? true: false
            })
            
            fillTable(list);
            window.alert('delete successfull')
        } else {
            window.alert('unable to delete')
        }
    })
    // console.log(NurseId,'id');
}

