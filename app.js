// בחברת שמירה שעושה סיורים רוצים לתעד את ביקורי השומרים בנקודות השונות, ולשם כך מבקשים ממך לכתוב תוכנה שעונה לאפיונים הבאים:

// הנקודות ניתנות לניהול, כלומר התוכנה מאפשרת להוסיף, לערוך למחוק ולראות את רשימת כל הנקודות הקיימות

// לשם כך נדרש ליצור גם עמודי צד קדמי וכן תמיכת צד שרת

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "guard.html"))
})
// app.get('/', (req, res) => { })
// app.get('/', (req, res) => { })
// app.get('/', (req, res) => { })
// app.get('/', (req, res) => { })