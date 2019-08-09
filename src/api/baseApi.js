import axios from "axios";
import qs from "qs";

let http = {
    post: "",
    get: ""
}

http.post = (api, data) => {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.post(api, params)
            .then(res => {
                resolve(res.data);
            }).catch(e => {
                reject(e);
            })
    })
}

http.get = (api, data) => {
    return new Promise((resolve, reject) => {
        axios.get(api, {
                params: data
            })
            .then(res => {
                resolve(res.data);
            }).catch(e => {
                reject(e);
            })
    })
}

export default http