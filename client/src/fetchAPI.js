import axios from 'axios'
//Todo: Upcoming Feature
const prodURL = `https://shoekart-31xv.onrender.com/`;
const baseUrl = process.env.NODE_ENV === 'production' ? prodURL : '/api'

const getData = async (api) => {
    const results = await axios.get(`${baseUrl}${api}`);
    return results.data
}

const postData = async (id) => {
    await axios.post(`${baseUrl}api/users/1459/cart`, {
        productId: id
    });
}
export {getData, postData};