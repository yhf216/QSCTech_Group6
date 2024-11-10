
// console.log(import.meta.env);

const API_URL = import.meta.env.VITE_API_URL
let message = {}
let notification = {}
const API = {
    get: (url) => {
        return new Promise((resolve, reject) => {
        fetch(API_URL + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                notification.error({
                    title: "Network Error",
                    content: 
`Something went wrong when fetching data from server.
URL: ${API_URL + url}
Status: ${response.status}`,
            meta: (new Date()).toLocaleString()
                })
                reject("Something went wrong when fetching data from server.")
            }
        }).then((data) => {
            if(data.code === 200){
                resolve(data.data)
            }else{
                message.error(data.message)
                reject(data.message)
            }
        })
    })
},
    post: (url, data) => {
        return new Promise((resolve, reject) => {
        fetch(API_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                notification.error({
                    title: "Network Error",
                    content: 
`Something went wrong when sending data to server.
URL: ${API_URL + url}
Status: ${response.status}`,
            meta: (new Date()).toLocaleString()
                })
                reject("Something went wrong when sending data to server.")
            }
        }).then((data) => {
                if(data.code === 200){
                    resolve(data.data)
                }else {
                    message.error(data.message)
                    reject(data.message)
                }
            })
        })
    },
    put: (url, data) => {
        return new Promise((resolve, reject) => {
        fetch(API_URL + url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                notification.error({
                    title: "Network Error",
                    content: 
`Something went wrong when updating data on server.
URL: ${API_URL + url}
Status: ${response.status}`,
            meta: (new Date()).toLocaleString()
                })
                reject("Something went wrong when updating data on server.")
            }
        }).then((data) => {
                if(data.code === 200){
                    resolve(data.data)
                }else {
                    message.error(data.message)
                    reject(data.message)
                }
            })
        })
    },
    delete: (url) => {
        return new Promise((resolve, reject) => {
        fetch(API_URL + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                notification.error({
                    title: "Network Error",
                    content: 
`Something went wrong when deleting data from server.
URL: ${API_URL + url}
Status: ${response.status}`,
            meta: (new Date()).toLocaleString()
                })
                reject("Something went wrong when deleting data from server.")
            }
        }).then((data) => {
                if(data.code === 200){
                    resolve(data.data)
                }else {
                    message.error(data.message)
                    reject(data.message)
                }
            })
        })
    }
}


const initAPIHooks = (_message,_notification)=>{
    message = _message
    notification = _notification
}

export{API,initAPIHooks}