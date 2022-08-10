const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
	static: './client/build',
});

const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.get('/');
server.listen(PORT, () => {
	console.log('Server is running');
});
