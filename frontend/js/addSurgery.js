document.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:5000/surgeon/-').then(res => {
        surList = res['data']['data']
        console.log(res);
        fillsur(surList)
    })
})

const main = document.getElementById('main');
let sid = null
let pid = null
let sn = null
let fees = null
let date = null
let sur = true
let pat = false
let checkDate = false
let usurList = []
let availList = []
let checked = false

const fillsur = (list) => {
    temp = ''
    list.forEach(async e => {
        let name = String(e.FirstName + ' ' + e.MiddleName + ' ' + e.LastName)

        temp += `<div class="card card-body px-5 bg-light text-dark mx-5 mb-4 rounded border border-primary" data-id="${e.SurId}" id="surgeon">
                        <h5 data-id="${e.SurId}">Name: ${name}</h5>
                        <span class="card-text" data-id="${e.SurId}"><span class="card-text fw-semibold ">Specialization:</span> ${e.Specialization} <span class="card-text fw-semibold ms-5">Address:</span>  ${e.Address} </span>
                </div>`

        main.innerHTML = temp
    })
}

const surgeon = document.getElementById("main")
const select = document.getElementById('select')

surgeon.addEventListener('click', (e) => {
    if (sur) {
        sid = Number(e.target.dataset.id)
        sur = false
        pat = true
        fillPat()
        select.innerHTML = 'Select Patient'
    } else if (pat) {
        pid = Number(e.target.dataset.id)
        pat = false
        dat = true
        takedate()
        select.innerHTML = 'select date'
    }
})

const fillPat = async() => {
    let list = null
    await axios.get('http://localhost:5000/patients/-').then(res => {
        list = res['data']['data']
        console.log(res);
    })

    temp = ''
    list.forEach(async e => {
        let name = String(e.FirstName + ' ' + e.MiddleName + ' ' + e.LastName)

        temp += `<div class="card card-body px-5 bg-light text-dark mx-5 mb-4 rounded border border-primary" data-id="${e.PatientId}" >
                        <h5 data-id="${e.PatientId}">Name: ${name}</h5>
                        <span class="card-text" data-id="${e.PatientId}"><span class="card-text fw-semibold ">Blood Group:</span> ${e.Blood_Group} <span class="card-text fw-semibold ms-5">Address:</span>  ${e.Address} </span>
                </div>`

        main.innerHTML = temp
    })
}

const takedate = () => {
    main.innerHTML = `<div id="temp">

                        <div class="mb-4 d-flex">
                            <label  class="form-label me-3">    Name:</label>
                            <input type="text" class="form-control w-100 " id="nmjk">
                        </div>

                        <div class="mb-4 d-flex">
                            <label  class="form-label me-3">    Date:</label>
                            <input type="date" class="form-control w-100 " id="date" onchange="falsecheck()">
                        </div>

                        <div class="mb-4 d-flex ps-5">
                            <button class="btn btn-secondary ms-5 px-4" id="check" onclick="check()">check</button>
                        </div>
                        
                        <div class="mb-4 d-flex">
                            <label  class="form-label me-3 ">    Fees:</label>
                            <input type="number" class="form-control w-100" id="fees">
                        </div>
                        <div class=" ">
                            <button id="add" class="btn btn-primary justify-content-between mx-3 ms-5 px-4" onclick="add()">Add</button>
                            <button class="btn btn-danger mx-3" onclick="cancel()" id="cancel">Cancel</button>
                        </div>
                    </div>`

    main.style.display = 'flex'
    main.style.justifyContent = 'center'

    axios.get('http://localhost:5000/surgeries/' + sid).then(res => {
        // fillupsur(res['data']['data']);
        usurList = res['data']['data']
        usurList = usurList.filter(e => {
            return (Number(new Date(e.date)) >= Number(new Date(new Date().toDateString())) ? true : false)
        })
        console.log(usurList);
        fillupsur(usurList)
    })

    const usur = document.getElementById('sur');

    const fillupsur = (list) => {
        temp = `<h5 class="ms-5">Upcoming Surgeries</h5>
                <hr class="mx-4 border border-dark border-1 ">
            `
        list.forEach(async e => {
            const surDate = new Date(e.date);

            let patName = ''

            await axios.get('http://localhost:5000/patients/' + e.p_id).then(res => {

                const { firstname, middlename, lastname } = res['data']['data'][0]
                patName = firstname + " " + middlename + " " + lastname
            })

            temp += `<div class="card card-body px-5 bg-light text-dark mx-5 mb-4 rounded border border-primary" data-id="${e.SurId}" id="surgeon">
                            <h5 class="  mt-3">Date: ${surDate.toLocaleDateString()} - ${surDate.toLocaleDateString('en-US',{weekday: 'long'})}</h5>
                            <hr class="bg-dark ">
                            <h5 data-id="${e.SurId}">Name: ${e.name}</h5>
                            <span class="card-text" data-id="${e.SurId}">
                                <span class="card-text fw-semibold ">Patient:</span>  ${patName} 
                            </span>
                    </div>`

            usur.innerHTML = temp
        })
    }


    const avail = document.getElementById('avail');

    axios.get('http://localhost:5000/surgeonAvailaibility/' + sid).then(res => {

        let x = 'Doctor Availaibility: '

        availList = res['data']['data']

        res['data']['data'].forEach(e => {
            let p = new Date()
            p.setDate(e.day - 1)
            x += ' ' + p.toLocaleDateString('en-US', { weekday: 'long' });
            avail.innerHTML = x
        })
    })
}


function cancel() {
    location.href = 'surgeries.html'
}

function add() {
    if (!checked) window.alert('check availaibility first please')
    else if (!checkDate) window.alert('selected date not availaible')
    else {
        date = new Date(document.getElementById('date').value).toDateString();
        fees = Number(document.getElementById('fees').value)
        sn = document.getElementById('nmjk').value
        axios.post('http://localhost:5000/surgeries/-', { sn, sid, pid, date, fees })
        location.href = 'surgeries.html'
    }
}

function check() {
    date = new Date(document.getElementById('date').value);
    console.log('tt0', date.getDay());
    let k = true
    checkDate = false

    availList.forEach(e => {
        if (e.day == date.getDay() && k) {
            checkDate = true
            k = false
        }
    })

    if (checkDate) usurList.forEach(e => {
        if (new Date(e.date) == new Date(date)) checkDate = false
    })

    if (!checkDate) window.alert('selected date not availaible')
    else window.alert('selected date availaible')

    checked = true
        // console.log(checkDate)
}

function falsecheck() {
    checked = false
    checkDate = true
}