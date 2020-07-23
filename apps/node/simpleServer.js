const http = require('http');
const	url = require('url');
const	path = require('path');
const	fs = require('fs');
const { writeError, handlePost } = require('./handlePost');

const PORT = process.argv[2] || 8888;

const contentTypesByExtension = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript'
};


const handleGet = (request, response) => {
	const uri = url.parse(request.url).pathname;
	let filename = path.join(process.cwd(), uri);

	fs.exists(filename, function (exists) {
		if (!exists) {
			response.statusCode = 404;
			return writeError(response, 404, [
				'404 Not Found\n',
				`filename: ${filename}\nuri: ${uri}\n`,
				`Request\n`,
				` method : ${request.method}\n`,
				` headers: ${JSON.stringify(request.headers, null, 2)}\n`
			]);
		}

		if (fs.statSync(filename).isDirectory()) {
			filename += '/index.html';
		}

		fs.readFile(filename, 'binary', function (err, file) {
			if (err) {
				return writeError(response, 500, [err + '\n']);
			}

			var headers = {};
			var contentType = contentTypesByExtension[path.extname(filename)];
			if (contentType) headers['Content-Type'] = contentType;
			response.writeHead(200, headers);
			response.write(file, 'binary');
			response.end();
		});
	});
}

//Connect and serve...
// request: https://nodejs.org/api/http.html#http_class_http_incomingmessage
// response: https://nodejs.org/api/http.html#http_class_http_serverresponse
http
	.createServer(function (request, response) {
		const { method } = request;
		switch(method) {
			case "GET": return handleGet(request, response);
			case "POST": return handlePost(request, response);
			default: return writeError(response, 404, ['Not implemented yet.', method]);
		}
	})
	.listen(parseInt(PORT, 10));

console.log(`
Static file server running at
  => http://localhost:${PORT}
CTRL + C to shutdown`);
