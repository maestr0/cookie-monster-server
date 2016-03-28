var http = require('http');  
http.createServer(function (req, res) {  
      res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Cookie Monster! PAWEL TEST\n');
}).listen(1337);
