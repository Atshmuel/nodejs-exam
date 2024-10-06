const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const port = 3010;

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`listen on url: http://localhost:${port}/`);
})

let pointsCnt = 0;
const points = []
let visitsCnt = 0;
const visits = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"))
})
app.get('/manager', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "manager.html"))
})
app.get('/guard', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "guard.html"))
})
app.get('/manager/points', (req, res) => { res.status(200).json(points) })

app.get('/manager/visits', (req, res) => { res.status(200).json(visits) })

app.post('/manager/point', (req, res) => {
    if (!req.body.pointName || req.body.pointName === "") {
        return res.status(400).json({ message: 'Point name must be supplied !' })

    }
    const pointName = req.body.pointName
    const point = { id: pointsCnt++, name: pointName }
    points.push(point)
    res.status(200).json({ message: `Point: ${pointName} created successfully` })
})
app.patch('/manager/point/:pointId', (req, res) => {
    const pointId = req.params.pointId
    const prevName = req.body.prevName
    const newName = req.body.newName

    if (!pointId || !prevName || !newName) {
        return res.status(400).json({ message: "Point id or Name must be sent to the server to update point" })
    }
    const index = points.findIndex(el => el.id === Number(pointId))
    if (index === -1) {
        return res.status(400).json({ message: 'Failed to find this point id' })
    }
    points[index].name = newName
    visits.forEach(visit => {
        if (points[index].name === visit.name) {
            visit.name = newName
        }
    })
    res.status(200).json({ message: `Updated Point: ${prevName} to: ${newName} successfily !` })
})
app.delete('/manager/point/:pointId', (req, res) => {
    const pointId = req.params.pointId
    if (!pointId) {
        return res.status(400).json({ message: "Point id must be sent to the server to get the check-in" })

    }
    const point = points.findIndex(el => el.id === Number(pointId))

    const deletedPoint = points.splice(point, 1)

    if (!deletedPoint.length) {
        return res.status(400).json({ message: "Could not find this point id." })
    }

    res.status(200).json({ message: "Deleted successfily !" })
})
app.post('/guard/visit/:pointId', (req, res) => {
    const pointId = req.params.pointId
    if (!pointId) {
        res.status(400).json({ message: "Point id must be sent to the server to get the check-in" })
        return
    }
    const pointData = points.find(el => Number(el.id) === Number(pointId))
    if (!pointData) {
        return res.status(400).json({ message: "Could not find this point id." })

    }
    const visit = { id: visitsCnt++, point: pointData, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() }
    visits.push(visit)
    res.status(200).json(visits)
})
