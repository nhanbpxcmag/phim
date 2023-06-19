var express = require('express')
var cors = require('cors')
var app = express()
const fs = require("fs");
const path = 'D:/phim/'

app.use(cors())
app.use('/static', express.static(path))
app.use('/static_bd', express.static(path+'bongda'))
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