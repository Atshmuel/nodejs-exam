const modalClose = document.querySelector('.close-modal')
const modalContainer = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const newPointBtn = document.getElementById('new-point')
const allPointsBtn = document.getElementById('all-point')
const checkPointsBtn = document.getElementById('check-points')
const table = document.getElementById('table')

newPointBtn.addEventListener('click', () => {
    modalContainer.style.display = 'flex'
    setTimeout(() => {
        document.addEventListener('click', outClick = (e) => {
            if (e.target !== modal) modalContainer.style.display = "none"
        })
    }, 500)
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
                    <td>${el.name}</td>
                    <td><button onclick="console.log(${el.id})">✎</button></td>
                    <td><button onclick="console.log(${el.id})">🗑️</button></td>
                </tr>
                `
    })
    console.log(rows);

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

allPointsBtn.addEventListener('click', showPoints)
checkPointsBtn.addEventListener('click', showVisits)


