import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com'

//تا درخواست انجام نشده نرو خط بعد
export const getProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data
}