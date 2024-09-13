import toast from 'react-hot-toast'

export const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text)
    toast.success('Скопировано в буфер обмена')
  } catch (error) {
    console.error(error)
  }
}
