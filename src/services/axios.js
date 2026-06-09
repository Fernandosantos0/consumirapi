import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001', /* URL da minha APIRest Full */
    headers: {
        'Content-Type': 'application/json'
    }
});
