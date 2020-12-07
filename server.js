const http = require("http");

const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end("epic hawk");
});

const PORT = 5001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
