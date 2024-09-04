import axios from 'axios'
import { API_URL } from '~/utils/env'

export const axiosInstance = axios.create({
  baseURL: API_URL,
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
