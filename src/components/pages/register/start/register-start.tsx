'use client'

import { CalendarDate } from '@internationalized/date'
import { DatePicker } from '@nextui-org/date-picker'
import { Input } from '@nextui-org/input'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { cn } from '@nextui-org/theme'
import { Controller } from 'react-hook-form'
import { MyButton } from '~/ui/my-button'
import { SearchCity } from './search-city'
import { useStart } from './useStart'

const radioClassNames = {
  base: cn(
    'flex m-0 bg-content2/50 hover:bg-content2 items-center w-[calc(50%-4px)]',
    'max-w-full cursor-pointer rounded-lg gap-2 px-4 py-2 border-2 border-transparent',
    'data-[selected=true]:border-primary data-[selected=true]:bg-content2 transition-colors duration-300'
  )
}

const currentDate = new Date()
const eighteenYearsAgo = new Date()
eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18)
const maxDate = new CalendarDate(
  eighteenYearsAgo.getFullYear(),
  eighteenYearsAgo.getMonth(),
  eighteenYearsAgo.getDate()
)

export const RegisterStart = () => {
  const { onSubmit, errors, register, control, setValue, getValues } =
    useStart()

  return (
    <form className='flex flex-col gap-4 p-4' onSubmit={onSubmit}>
      <h1 className='text-xl font-bold'>Create Profile</h1>
      <Input
        {...register('firstName')}
        placeholder='Name'
        isInvalid={!!errors.firstName}
        errorMessage={errors.firstName?.message}
      />
      <Input
        {...register('aboutMe')}
        placeholder='About you'
        description={
          <>
            Example: Designer from Dubai. Love surfing. <br /> Max. 120
            characters
          </>
        }
        isInvalid={!!errors.aboutMe}
        errorMessage={errors.aboutMe?.message}
      />
      <Controller
        name='birthDate'
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label='Date of birth'
            isInvalid={!!errors.birthDate}
            errorMessage={errors.birthDate?.message}
            maxValue={maxDate}
            showMonthAndYearPickers
          />
        )}
      />
      <SearchCity
        setCity={(city) => setValue('city', city)}
        getCity={() => getValues('city')}
        errors={errors}
      />
      <Controller
        name='gender'
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            label='Gender'
            orientation='horizontal'
            value={value}
            onChange={onChange}
            isInvalid={!!errors.gender}
            errorMessage={errors.gender?.message}>
            <Radio value='MALE' classNames={radioClassNames}>
              Male
            </Radio>
            <Radio value='FEMALE' classNames={radioClassNames}>
              Female
            </Radio>
          </RadioGroup>
        )}
      />
      <Controller
        name='genderPreference'
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            label='Gender Preference'
            orientation='horizontal'
            value={value}
            onChange={onChange}
            isInvalid={!!errors.genderPreference}
            errorMessage={errors.genderPreference?.message}>
            <Radio value='MALE' classNames={radioClassNames}>
              Male
            </Radio>
            <Radio value='FEMALE' classNames={radioClassNames}>
              Female
            </Radio>
          </RadioGroup>
        )}
      />
      <MyButton fullWidth type='submit'>
        Submit
      </MyButton>
    </form>
  )
}
