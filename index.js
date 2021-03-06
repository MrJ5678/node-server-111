/*
 * @Author: hhhhhq
 * @Date: 2020-12-01 15:50:20
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-12-13 10:44:06
 * @Description: file content
 */
var express = require('express')
var multer  = require('multer')
var cors = require('cors')

var upload = multer({ dest: 'uploads/' })

var app = express()

app.get('/', (req, res) => {
  res.send('hello nodejs')
})

app.options('/options', cors())
app.post('/upload', cors(), upload.single('file'), (req, res) => {
  let fileName = req.file.filename
  let object = { id: fileName }
  res.send(JSON.stringify(object))
})

app.get('/preview/:key', cors(), (req, res) => {
  // console.log(req.params.key)
  res.sendFile(`uploads/${req.params.key}`, {
    root: __dirname,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  }, (error) => {
    // res.status(404).send('Not Found')
  })
})

var serverPort = 3000;
var port = process.env.PORT || serverPort
// console.log(port);

app.listen(port, () => console.log(`server is running on port ${port}`))