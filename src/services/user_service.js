import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getUser = (page) => {

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${API_BASE_URL}/getUsers?page=${page}`,
            headers:  {
                "Content-Type": "application/json",
            }
        })
        .then( response => {
            if(response.data.success === true)
            {
                resolve(response.data.result)
            }
            else{
                reject(response.data.error)
            }
        })
        .catch( err => reject(err))
    })
}