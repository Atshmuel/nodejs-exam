const modalClose = document.querySelector('.close-modal')
const modalContainer = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const newPointBtn = document.getElementById('new-point')
const allPointsBtn = document.getElementById('all-point')
const checkPointsBtn = document.getElementById('check-points')
const table = document.getElementById('table')
const submitNewPointBtn = document.getElementById('point-submit-btn')
const newPointInput = document.getElementById('new-point-input')

newPointBtn.addEventListener('click', () => {
    modalContainer.style.display = 'flex'
})

modalClose.addEventListener('click', () => {
    modalContainer.style.display = 'none'
})


const showPoints = async () => {
    const res = await fetch('http://localhost:3010/manager/points')
    if (!res.ok) {
        alert('Failed to fetch list')
        return
    }
    const data = await res.json();
    if (!data.length) {
        alert("No points found, add some first.")
        return
    }
    table.innerHTML = ""
    let rows = ""
    data.forEach((el) => {
        rows += `
                <tr>
                    <td>${el.id}</td>
                    <td>${el.name}</td>
                    <td><button onclick="console.log(${el.id})">✎</button></td>
                    <td><button onclick="console.log(${el.id})">🗑️</button></td>
                </tr>
                `
    })
    const tableMarkup = `
            <thead>
                <tr>
                    <td>point id</td>
                    <td>point name</td>
                    <td>edit point</td>
                    <td>delete point</td>
                </tr>
            </thead>
            <tbody id="table-info">
                    ${rows}
            </tbody>
        `

    table.insertAdjacentHTML("beforeend", tableMarkup)
}

const showVisits = async () => {
    const res = await fetch('http://localhost:3010/manager/visits')
    if (!res.ok) {
        alert('Failed to fetch list')
        return
    }
    const data = await res.json();
    if (!data.length) {
        alert("No visits found, time to check you guard performence...")
        return
    }
    table.innerHTML = ""
    let rows = ""
    data.forEach((el) => {
        rows += `
        <tr>
        <td>${el.id}</td>
        <td>${el.date}</td>
        <td>${el.time}</td>
        <td>${el.point.name}</td>
        </tr>
                `
    })

    const tableMarkup = `
            <thead>
                <tr>
                    <td>visit id</td>
                    <td>visit date</td>
                    <td>visit time</td>
                    <td>point name</td>
                </tr>
            </thead>
            <tbody id="table-info">
                    ${rows}
            </tbody>
        `

    table.insertAdjacentHTML("beforeend", tableMarkup)
}

const submitPoint = async () => {
    const res = await fetch('http://localhost:3010/manager/point', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pointName: `${newPointInput.value}` })
    })
    if (!res.ok) {
        alert('Point name must be supplied !')
        return
    }
    if (table.innerText !== "") showPoints()
    alert("Point created successfully !")
    newPointInput.value = ""

}

allPointsBtn.addEventListener('click', showPoints)
checkPointsBtn.addEventListener('click', showVisits)
submitNewPointBtn.addEventListener('click', submitPoint)

