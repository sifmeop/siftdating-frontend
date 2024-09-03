import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { axiosInstance } from '~/libs/axios-instance'

export enum ReactionType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE'
}

interface ISetReaction {
  targetId: string
  type: ReactionType
}

const setReaction = async (body: ISetReaction) => {
  try {
    await axiosInstance.post('/discover', body)
  } catch (error) {
    console.log(`Error on setting reaction: ${error}`)
  }
}

export const useReaction = () => {
  const queryClient = useQueryClient()
  const [clickedType, setClickedType] = useState<string | null>(null)

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['setReaction'],
    mutationFn: setReaction,
    onMutate: (variables) => {
      setTimeout(async () => {
        await queryClient.cancelQueries({ queryKey: ['discover'] })

        const previousData = queryClient.getQueryData(['discover']) as any

        if (previousData) {
          const updatedData = {
            ...previousData,
            data: previousData.data.filter(
              (user: any) => user.id !== variables.targetId
            )
          }

          queryClient.setQueryData(['discover'], updatedData)
        }

        return { previousData }
      }, 500)
    }
  })

  const onClick = async (body: ISetReaction) => {
    if (isPending) {
      return
    }

    setClickedType(body.type)
    await mutateAsync(body)
  }

  return { onClick, isPending, clickedType }
}
