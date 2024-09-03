import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { axiosInstance } from '~/libs/axios-instance'

interface IPhoto {
  id: string
  file: File
}

const types = ['image/jpeg', 'image/jpg', 'image/png']

export const useSendPhotos = () => {
  const router = useRouter()
  const [photos, setPhotos] = useState<IPhoto[]>([])

  useEffect(() => {
    Telegram.WebApp.BackButton.show()
    Telegram.WebApp.BackButton.onClick(() => {
      router.push('/register/photo')
    })
    Telegram.WebApp.MainButton.show()
    Telegram.WebApp.MainButton.setText('Continue')
    Telegram.WebApp.MainButton.onClick(onSubmit)

    return () => {
      Telegram.WebApp.MainButton.hide()
      Telegram.WebApp.MainButton.offClick(onSubmit)
    }
  }, [])

  const setUserPhotos = async () => {
    const files = new FormData()

    photos.forEach((photo) => {
      files.append('files', photo.file)
    })

    try {
      Telegram.WebApp.MainButton.showProgress()
      await axiosInstance.put('/register/photo', files, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      router.push('/')
    } catch (error) {
      console.log(`Error on setting photos: ${error}`)
    } finally {
      Telegram.WebApp.MainButton.hideProgress()
    }
  }

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['register-photo'],
    mutationFn: setUserPhotos
  })

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (isPending) {
      return
    }

    await mutateAsync()
  }

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (!types.includes(file.type)) {
      alert('Only jpeg and png files are allowed')
      return
    }

    console.log('file', file)

    const id = Date.now().toString()

    const newPhoto = { id, file }
    setPhotos((prev) => [...prev, newPhoto])
  }

  const onDelete = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id))
  }

  return { photos, onUpload, onDelete, onSubmit }
}
