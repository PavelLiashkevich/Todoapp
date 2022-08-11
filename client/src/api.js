import axios from 'axios';

const baseURL =
	// process.env.REACT_APP_SERVER_API ||
	'https://todo-app-infotecs.herokuapp.com:3000';
const api = axios.create({ baseURL });

export default api;
