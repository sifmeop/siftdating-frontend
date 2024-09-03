import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate } from '@internationalized/date'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { axiosInstance } from '~/libs/axios-instance'

const schema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'First name is too long'),
  aboutMe: z.string().min(1, 'About is required').max(120, 'About is too long'),
  birthDate: z
    .custom<CalendarDate>()
    .refine((date) => date instanceof CalendarDate, {
      message: 'Date of birth is required'
    }),
  city: z.string().min(1, 'City is required'),
  gender: z
    .string({ message: 'Gender is required' })
    .min(1, 'Gender is required')
})

export type IRegisterStartForm = z.infer<typeof schema>

export const useStart = () => {
  const router = useRouter()

  useEffect(() => {
    Telegram.WebApp.BackButton.hide()
    Telegram.WebApp.MainButton.show()
    Telegram.WebApp.MainButton.setText('Continue')
    Telegram.WebApp.MainButton.onClick(onSubmit)

    return () => {
      Telegram.WebApp.MainButton.hide()
      Telegram.WebApp.MainButton.offClick(onSubmit)
    }
  }, [])

  const setProfile = async (body: IRegisterStartForm) => {
    try {
      Telegram.WebApp.MainButton.showProgress()
      await axiosInstance.put('/register/start', {
        ...body,
        birthDate: body.birthDate.toString()
      })
      router.push('/register/photo')
    } catch (error) {
      console.log(`Error on setting reaction: ${error}`)
    } finally {
      Telegram.WebApp.MainButton.hideProgress()
    }
  }

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['register-start'],
    mutationFn: setProfile
  })

  const {
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm<IRegisterStartForm>({
    resolver: zodResolver(schema)
  })

  const onSubmit = handleSubmit(async (data) => {
    if (isPending) {
      return
    }

    console.log(data.birthDate.toString())

    await mutateAsync(data)
  })

  return { ...form, errors, onSubmit }
}
