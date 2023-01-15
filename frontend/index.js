document.addEventListener('DOMContentLoaded',async () => {
    await fetch('http://localhost:5000/nurse').then(res => res.json()).then(data => {
    //     console.log(data)})

    // await fetch('http://localhost:5000/physician').then(res => res.json()).then(data => {
        fillTable(data['data'])
        list = data['data']
        console.log(data)
    })
})

let list = []

document.querySelector("table tbody").addEventListener('click', e => {
    console.log(e.target.dataset.id);
    if (e.target.id == "delete") {
        deleteId(e.target.dataset.id)
    }

    if (e.target.id == "edit") {
        update(e.target.dataset.id)
    }
})

const post = (NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address) => {
    fetch('http://localhost:5000/nurse',{
        headers: {'Content-type': 'application/json'},
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
    })
}

const update = (NurseId,First_Name,Middle_Name,Last_Name,Salary,DOJ,Email_Id,Address) => {
    fetch('http://localhost:5000/nurse', {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'},
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
            location.reload();
        }
    })
}

const deleteId = (NurseId) => {
    fetch('http://localhost:5000/nurse',{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: {NurseId: NurseId}
    }).then(res => res.json()).then(data => {
        if (data.success) {
            // location.reload()
            list = list.filter(e => {
                // console.log(e);
                // console.log(e.id);
                 return e.NurseId != NurseId ? true: false
            })
            
            fillTable(list);
        }
    })
}

const fillTable = data =>{
    const table = document.querySelector("table tbody")
    if (data.length == 0) table.innerHTML = "<tr><td colspan='5' class='bg-danger text-center'>No data</td></tr>"
    else {
        let temp = ""
        data.forEach(e => {
            temp += `<tr>
                        <th scope="row">${e.phyId}</th>
                        <td >${e.FirstName +" "+ e.MiddleName +" "+ e.LastName}</td>
                        <td><button class="btn btn-secondary " data-id="${e.phyId}" id="view">view</button></td>
                        <td><button class="btn btn-primary" data-id="${e.phyId}" id="edit">edit</button></td>
                        <td><button class="btn btn-danger" data-id="${e.phyId}" id="delete">delete</button></td>
                     </tr>`
        });
        table.innerHTML = temp
    }
}
