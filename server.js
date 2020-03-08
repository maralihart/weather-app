const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function () { // server listening to port 3000
  console.log('Example app listening on port 3000!')
})