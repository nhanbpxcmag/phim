var express = require('express')
var cors = require('cors')
var app = express()
const fs = require("fs");
const path_ = require("path");
var srt2vtt = require('srt-to-vtt')
const path = 'D:/phim/'

app.use(cors())
// app.use('/static', express.static(path))
app.use('/static/:id', async function (req, res) {
  const file_name = req.params.id;
  const path_file = await srtTovtt(file_name);
  if(path_file){
    res.sendFile(path_file);
  }
  else
  res.send("")
})
app.use('/static_bd/:id', async function (req, res) {
  const file_name = req.params.id;
  const path_file = await srtTovtt(file_name,path+'bongda');
  if(path_file){
    res.sendFile(path_file);
  }
  else
  res.send("")
})
app.get('/static1/:id', (req, res) => {
  res.sendFile(path+req.params.id)
})
app.get("/static2/:id", function (req, res) {
    const range = req.headers.range;
    // const path = '/mnt/sdb/phim/'+req.params.id;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = path;
    const videoSize = fs.statSync(path).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.listen(1993, function () {
  console.log('CORS-enabled web server listening on port 1993')
})
async function srtTovtt(file_name,path_root = path){
  if(!file_name) return null;
  const arr_file = file_name.split('.');
  const ex_file = arr_file.pop();
  const name = arr_file.join('.');
  let path_file = path_.join(path_root, file_name);  
  if(ex_file === 'srt'){    
    let vtt = path_.join(path_root, name + '.vtt');
   await createTheFile(path_file,vtt)
    path_file = vtt;
  }
  if(path_file){
    console.log(fs.existsSync(path_file))
    if (!fs.existsSync(path_file)) {
      return null;
  }
  }
  return path_file;
}
async function createTheFile(path_file,vtt) {
  return new Promise(resolve => {
      let b = fs.createReadStream(path_file)
      .pipe(srt2vtt())
      .pipe(fs.createWriteStream(vtt));
      b.on('finish', resolve);
  })
  }