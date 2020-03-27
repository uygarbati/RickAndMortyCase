import axios from 'axios'

const RAM = axios.create({
  baseURL: process.env.REACT_APP_RICKANDMORTY_API,
  headers: {},
})

axios.defaults.params = {}
const requestInterceptors = [
  [
    function (config) {
      const timestamp = Date.now()

      config.params = {
        ts: timestamp,
        ...config.params,
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  ],
]

requestInterceptors.forEach(interceptor => {
  RAM.interceptors.request.use(...interceptor)
})

export {
  RAM,
}
