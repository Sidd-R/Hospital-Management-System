document.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:5000/surgeries/-').then(res => {
        surList = res['data']['data']
        upComingSurgeries()
    })
})

let surList = [];
let pastSur = false

let past = document.getElementById('past')
let upcoming = document.getElementById('upcoming')
let surgery = document.getElementById('surgery')

past.onclick = () => {
    if (!pastSur) {
        past.setAttribute('class','active pe-none')
        upcoming.setAttribute('class','text-muted')
        pastSur=true
        pastSurgeries()
    }
}

upcoming.onclick = () => {
    if (pastSur) {
        upcoming.setAttribute('class','active pe-none')
        past.setAttribute('class','text-muted')
        pastSur=false
        upComingSurgeries()
    }
}

const upComingSurgeries = () => {
    let temp = surList.filter(e => {return (Number(new Date(e.date)) >= Number(new Date(new Date().toDateString())) ? true : false)})

    if (temp.length == 0) surgery.innerHTML = 'No Upcoming Surgeries'
    else fillTable(temp)
}

const pastSurgeries = () => {
    let temp = surList.filter(e => {return (Number(new Date(e.date)) < Number(new Date(new Date().toDateString())) ? true : false)})

    if (temp.length == 0) surgery.innerHTML = 'No Upcoming Surgeries'
    else fillTable(temp)
}

const fillTable = (list) => {
    temp = ''
    list.forEach(async e =>{
        const surDate = new Date(e.date);

        let surName = ''
        let patName = ''

        await axios.get('http://localhost:5000/surgeon/' + e.sur_id).then(res => {
            const {firstname,middlename,lastname} =  res['data']['data'][0]
            surName = firstname + " " + middlename +" " + lastname
        } )

        await axios.get('http://localhost:5000/patients/' + e.p_id).then(res => {

            const {firstname,middlename,lastname} =  res['data']['data'][0]
            patName = firstname + " " + middlename +" " + lastname
        } )
        console.log(e);

        temp += `<div class="card bg-dark text-light mx-5 mb-4">
                    <h5 class="card-header text-light mx-5 mt-3">Date: ${surDate.toLocaleDateString()}</h5>
                    <hr class="m-2 mx-5">
                    <div class="card-body mx-5">
                        <h5>${e.name}</h5>
                        <span class="card-text"><span class="card-text fw-semibold ">Surgeon:</span> ${String(surName)} <span class="card-text fw-semibold ms-5">Patient:</span>  ${patName} <span class="card-text fw-semibold ms-5">Fees:</span> ${'Rs. '+e.fees}</span>
                        <button class="btn btn-danger btn-outline-light mt-3 mb-4 ms-5 " data-id="${e.surgery_id}" id="delete">Delete</button>
                    </div>
                </div>`
            
        surgery.innerHTML = temp            
    })
}

surgery.addEventListener('click', e => {
    if (e.target.id == 'delete') {
        deleteSur(e.target.dataset.id);
        location.reload()
    }
})

const deleteSur = (id) => {
    axios.delete('http://localhost:5000/surgeries/' +id).then(res => console.log(res))
}
