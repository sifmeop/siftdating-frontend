'use client'

import Image from 'next/image'
import { MyButton } from '~/ui/my-button'
import { useSendPhotos } from './useSendPhotos'

export const RegisterPhoto = () => {
  const { photos, onUpload, onDelete, onSubmit } = useSendPhotos()

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-6 p-4'>
      <div>
        <input
          type='file'
          name='file'
          id='file'
          className='sr-only'
          onChange={onUpload}
          disabled={photos.length > 3}
        />
        <label
          htmlFor='file'
          className='relative flex cursor-pointer items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-4 text-center'>
          <div className='flex flex-col items-center justify-center'>
            <svg
              className='mb-3 h-10 w-10 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
            </svg>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              JPG or PNG
            </p>
          </div>
        </label>
      </div>
      {photos.map(({ id, file }) => (
        <div key={id} className='rounded-md bg-[#F5F7FB] px-8 py-4'>
          <div className='flex items-center justify-between'>
            <Image
              src={URL.createObjectURL(file)}
              width={100}
              height={200}
              alt={file.name}
            />
            <MyButton className='min-w-0' onClick={() => onDelete(id)}>
              <svg
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z'
                  fill='currentColor'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z'
                  fill='currentColor'
                />
              </svg>
            </MyButton>
          </div>
        </div>
      ))}
      <MyButton fullWidth type='submit'>
        Submit
      </MyButton>
    </form>
  )
}
