import axios from 'axios';

const baseURL =
	// process.env.REACT_APP_SERVER_API
	'https://todoapp-server-n5dm.onrender.com/';

const api = axios.create({ baseURL });

export default api;
