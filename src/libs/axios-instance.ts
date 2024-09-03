import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.10.104:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config
  }

  const initData = window?.Telegram?.WebApp?.initData

  if (initData) {
    config.headers['x-telegram-initdata'] = initData
  }

  return config
})
