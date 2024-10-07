const modalClose = document.querySelector('.close-modal')
const modalContainer = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const newPointBtn = document.getElementById('new-point')
const allPointsBtn = document.getElementById('all-point')
const checkPointsBtn = document.getElementById('check-points')
const table = document.getElementById('table')
const submitNewPointBtn = document.getElementById('point-submit-btn')
const newPointInput = document.getElementById('new-point-input')
const actionBtn = document.createElement('button')


newPointBtn.addEventListener('click', () => {
    actionBtn.innerHTML = 'Submit'
    actionBtn.onclick = submitPoint
    modal.appendChild(actionBtn)
    modalContainer.style.display = 'flex'

})
modal.addEventListener('click', (e) => {
    e.stopPropagation();
})
modalContainer.addEventListener('click', (e) => {
    if (e.target !== modal) {
        modalContainer.style.display = 'none'
        newPointInput.value = ""
        modal.removeChild(actionBtn)
    }
})
modalClose.addEventListener('click', () => {
    modalContainer.style.display = 'none'
    newPointInput.value = ""
    modal.removeChild(actionBtn)
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
        table.innerHTML = ""
        return
    }
    table.innerHTML = ""
    let rows = ""
    data.forEach((el, i) => {
        rows += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${el.name}</td>
                    <td><button id="${el.id} ${el.name}" onclick="addUpdateListner(${el.id},'${el.name}')">Edit ✎</button></td>
                    <td><button onclick="deletePoint(${el.id})">Delete 🗑️</button></td>
                </tr>
                `
    })
    const tableMarkup = `
            <thead>
                <tr>
                    <td>s.num</td>
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
        <td>${el.id + 1}</td>
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
    const data = await res.json()
    newPointInput.value = ""
    modal.removeChild(actionBtn)
    modalContainer.style.display = "none"
    alert(data.message)
    showPoints()

}
const deletePoint = async (id) => {
    const res = await fetch(`/manager/point/${id}`, { method: 'DELETE' })
    const data = await res.json()
    alert(data.message)
    showPoints()
}
const addUpdateListner = (id, name) => {
    actionBtn.innerHTML = 'Update'
    actionBtn.onclick = () => updatePoint(id, name)
    modal.appendChild(actionBtn)
    modalContainer.style.display = 'flex'


}
const updatePoint = async (id, name) => {
    const res = await fetch(`http://localhost:3010/manager/point/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prevName: name, newName: `${newPointInput.value}` })
    })
    const data = await res.json()
    modal.removeChild(actionBtn)
    newPointInput.value = ""
    modalContainer.style.display = 'none'
    alert(data.message)
    showPoints()

}


allPointsBtn.addEventListener('click', showPoints)
checkPointsBtn.addEventListener('click', showVisits)

