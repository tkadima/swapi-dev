import { useAppContext } from '@/app/components/AppContext'

type DetailPageProps = {
  id: string
  resourceType: string
  skip: string[]
  data: any
  isLoading: boolean
  error: any
}
const DetailPage = ({ id, resourceType, skip, data, isLoading, error }: DetailPageProps) => {
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
    if (Array.isArray(value)) {
      return value.map((val) => resourceMap.get(val) || val).join(', ')
    }
    return resourceMap.get(value) || value
  }

  return (
    <div className="detail-container">
      <img className="detail-image" src={imageUrl} alt={data.title ?? data.name} />
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
