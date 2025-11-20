import axios from 'axios';

axios.defaults.baseURL = 'https://api.example.com'; // Replace with your API base URL
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;