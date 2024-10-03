const select = document.getElementById('guard-point')
const btn = document.getElementById('submit')
const getPoints = async () => {
    const res = await fetch('/manager/points')
    if (!res.ok) {
        alert("Failed to fetch points")
        return
    }
    const data = await res.json()
    return data
}

const submitCheckPoint = async (id) => {
    const res = await fetch(`/guard/visit/${id}`, { method: 'POST' })
    if (!res.ok) {
        alert("Failed submit check point ")
        return
    }
    const data = await res.json()
    return data
}

const fillOptions = async () => {
    const pointsList = await getPoints()
    if (!pointsList.length) {
        alert('Found no points, please contact your manager to add some points')
        return
    }
    pointsList.forEach(point => {
        option = document.createElement("option")
        option.text = point.name
        option.value = point.id
        select.add(option)
    })
}



btn.addEventListener('click', async () => {
    const checkPoint = await submitCheckPoint(select.value)
    if (checkPoint.length) {
        alert('Check point submitted !')
    }
})
