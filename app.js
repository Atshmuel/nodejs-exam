
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

const gourds = [];
const points = []
const visits = []
// {gruadId:0,pointId:0,visitTime:0}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"))

})
app.get('/manager', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "manager.html"))
})
app.get('/guard', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "guard.html"))
})
// app.get('/manager/points', (req, res) => { })
// app.post('/manager/point', (req, res) => { })
// app.patch('/manager/point', (req, res) => { })
// app.delete('/manager/point', (req, res) => { })


// app.post('guard/visit/:pointId', (req, res) => { })
