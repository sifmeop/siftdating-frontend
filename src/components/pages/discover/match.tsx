import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { MyButton } from '~/ui/my-button'

export const Match = () => {
  return (
    <div className='container fixed inset-0 z-10 flex flex-col justify-center bg-[#1a181a]'>
      <div className='my-auto flex flex-col gap-2 text-center'>
        <div className='relative mx-auto flex w-fit items-center'>
          <Image
            className='rounded-l-[40%]'
            width={100}
            height={100}
            src='https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Boo'
            alt='Boo'
          />
          <div className='absolute left-1/2 -translate-x-1/2 rounded-full bg-[#191919] p-1.5'>
            <div className='w-fit rounded-full bg-white p-1'>
              <FaHeart fill='#191919' />
            </div>
          </div>
          <Image
            className='rounded-r-[40%]'
            width={100}
            height={100}
            src='https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Garfield'
            alt='Sammy'
          />
        </div>
        <h3 className='text-xl font-bold'>It&apos;s match!</h3>
        <p className='text-sm'>
          Arina contact is available to you. <br /> Start communication right
          now!
        </p>
      </div>
      <div className='mb-2 flex flex-col gap-2'>
        <MyButton color='primary'>Open chat</MyButton>
        <MyButton variant='light'>Continue exploring</MyButton>
      </div>
    </div>
  )
}
