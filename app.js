
// הנקודות ניתנות לניהול, כלומר התוכנה מאפשרת להוסיף, לערוך למחוק ולראות את רשימת כל הנקודות הקיימות
// בנוסף, יש ליצור עמוד שמאפשר הזנת ביקור בנקודה, שבו בוחרים את הנקודה שביקרנו בה. זמן הביקור נשמר אוטומטית

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
    if (!req.body.pointName) {
        res.status(400).json({ message: 'Point name must be supplied !' })
        return
    }
    const pointName = req.body.pointName
    const point = { id: pointsCnt++, name: pointName }
    points.push(point)
    res.status(200).json(points)

})
// app.patch('/manager/point', (req, res) => { })
// app.delete('/manager/point', (req, res) => { })

app.post('/guard/visit/:pointId', (req, res) => {
    const pointId = req.params.pointId
    if (!pointId) {
        res.status(400).json({ message: "Point id must be sent to the server to get the check-in" })
        return
    }
    const pointData = points.find(el => Number(el.id) === Number(pointId))
    if (!pointData) {
        res.status(400).json({ message: "Could not find this point id." })
        return
    }
    const visit = { id: visitsCnt++, point: pointData, date: new Date() }
    visits.push(visit)
    res.status(200).json(visits)
})
