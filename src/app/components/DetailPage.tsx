import { useAppContext } from '@/app/components/AppContext'
import Link from 'next/link'
import { fieldNames, getId } from '../fetchers'
import { Typography } from '@mui/material'

type DetailPageProps = {
  id: string
  resourceType: string
  skip: string[]
  data: any
  isLoading: boolean
  error: any
}
const DetailPage = ({
  id,
  resourceType,
  skip,
  data,
  isLoading,
  error,
}: DetailPageProps) => {
  const resourceMap = useAppContext()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Failed to load</div>
  }

  const keys = Object.keys(data).filter((key) => !skip.includes(key))
  const imageUrl = `https://starwars-visualguide.com/assets/img/${resourceType}/${id}.jpg`

  const displayValue = (key: string) => {
    const value = data[key]
    const keyName = fieldNames[key] || key
    if (Array.isArray(value)) {
      const arr =  value.map((val) => <Link key={val} href={`/${keyName}/${getId(val)}`}>
        <Typography component="p" variant="subtitle1">
          {resourceMap.get(val) || val} </Typography>
          </Link>)
      return <div className="detail-list-value">{arr}</div>
    }
    return resourceMap.get(value) || value
  }

  return (
    <div className="detail-container">
      <img
        className="detail-image"
        src={imageUrl}
        alt={data.title ?? data.name}
      />
      <div className="detail">
        {keys.map((key) => (
          <div className="detail-row" key={key}>
            <div className="detail-attribute">
              {key.toLowerCase().replaceAll('_', ' ')}:
            </div>
            <div className="detail-value">{displayValue(key)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default DetailPage
