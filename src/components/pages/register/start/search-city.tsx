import { Input } from '@nextui-org/input'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { Spinner } from '@nextui-org/spinner'
import Geonames from 'geonames.js'
import { useEffect, useRef, useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { useDebounce } from '~/hooks/use-debounce'
import { IRegisterStartForm } from './useStart'

interface IProps {
  setCity: (city: string) => void
  getCity: () => string
  errors: FieldErrors<IRegisterStartForm>
}

interface ICity {
  geonameId: number
  name: string
}

const geonames = Geonames({
  username: 'sifmeop',
  lan: 'en',
  encoding: 'JSON'
})

export const SearchCity = ({ getCity, setCity, errors }: IProps) => {
  const [cities, setCities] = useState<ICity[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isSelectedCityRef = useRef(false)

  const debounceSearch = useDebounce(search, 500)

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true)

      try {
        const data = await geonames.search({
          q: debounceSearch,
          maxRows: 5,
          startRow: 0,
          featureClass: 'P',
          orderby: 'population'
        })
        setCities(data.geonames)
      } catch (error) {
        console.error('Error fetching cities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!isSelectedCityRef.current && debounceSearch.length > 0) {
      fetchCities()
    } else {
      setCities([])
    }
  }, [debounceSearch])

  return (
    <div>
      <Input
        placeholder='Your city'
        value={search}
        onChange={(e) => {
          isSelectedCityRef.current = false
          const val = e.target.value

          if (val !== getCity()) {
            setCity('')
          }

          setSearch(val)
        }}
        isInvalid={!!errors.city}
        errorMessage={errors.city?.message}
      />
      {isLoading && (
        <div className='mt-4 text-center'>
          <Spinner />
        </div>
      )}
      {cities.length > 0 && (
        <Listbox
          items={cities}
          aria-label='Cities'
          onAction={(key) => {
            const city = cities.find(
              (city) => city.geonameId === Number(key)
            )!.name
            setCity(city)
            isSelectedCityRef.current = true
            setSearch(city)
            setCities([])
          }}>
          {(item) => (
            <ListboxItem key={item.geonameId}>{item.name}</ListboxItem>
          )}
        </Listbox>
      )}
    </div>
  )
}
