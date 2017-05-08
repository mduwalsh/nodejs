var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).any());

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/fileupload.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "fileupload.htm" );
})

app.post('/file_upload', urlencodedParser, function (req, res) {
  console.log(req.files);
  console.log(req.files[0].originalname);
  console.log(req.files[0].filename);
  console.log(req.files[0].path);
//    console.log(req.files.file.name);
//    console.log(req.files.file.path);
//    console.log(req.files.file.type);
   var file = __dirname + "/" + req.files[0].originalname;
   
   fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:req.files[0].originalname
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
