/*
 * @Author: hhhhhq
 * @Date: 2020-12-01 15:50:20
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-12-05 19:49:16
 * @Description: file content
 */
const express = require('express')
const multer  = require('multer')
const cors = require('cors')

const upload = multer({ dest: 'uploads/' })

const app = express()

app.options('/options', cors())
app.get('/', (req, res) => {
  res.send('hello nodejs')
})

app.post('/upload', cors(), upload.single('xxx'), (req, res) => {
  console.log(req.file);
  // res.set('Access-Control-Allow-Origin', '*')
  // res.json({key: req.file.filename})
  res.send(req.file.filename)
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

var port = process.env.PORT || 3000
// console.log(port);

app.listen(port, () => console.log(`server is running on port ${port}`))