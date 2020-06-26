const writeError = (response, status, lines) => {
	response.writeHead(status, { 'Content-Type': 'text/plain' });
	lines.forEach(line => {
		response.write(line);
	})
	response.end();
}


const asPropString = request => props => {
	return props.map(prop => {
		let val = request[prop];
		if (val) { //filter out null/undefined
			val = typeof val === 'object' ? Object.keys(val) : val;
		}
		return `${prop}: ${val}\n`;
	});
}

const handlePost = (request, response) => {
	// console.log(Object.keys(request));

	// '_readableState',   '_events',
	// '_eventsCount',     '_maxListeners',
	// 'socket',           'httpVersionMajor',
	// 'httpVersionMinor', 'httpVersion',
	// 'complete',         'headers',
	// 'rawHeaders',       'trailers',
	// 'rawTrailers',      'aborted',
	// 'upgrade',          'url',
	// 'method',           'statusCode',
	// 'statusMessage',    'client',
	// '_consuming',       '_dumped'
	const asString = asPropString(request);

	const data = [];
	request.on('data', chunk => {
		data.push(chunk);
	});
	request.on('end', () => {
		writeError(response, 200, [
			'POST handling ... ECHO.\n',
			...asString(['url', 'method', 'complete', 'statusCode', 'statusMessage']),
			`HEADERS:\n${JSON.stringify(request.headers, null, 3)}\n`,
			`DATA:\n${data.join('')}\n`
		]);
	});
}

module.exports = { writeError, handlePost };
