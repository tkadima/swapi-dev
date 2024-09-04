import { useAppContext } from '@/app/components/AppContext'
import { getId } from '../helpers'
import { ResourceLink } from './ResourceLinks'

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
  const { resourceMap, peopleSpeciesMap } = useAppContext()

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
    if (key === 'species' && resourceType === 'people' && value.length > 0) {
      const species = peopleSpeciesMap.get(data.url)
      return (
        species && (
          <ResourceLink
            field={key}
            id={getId(species)}
            name={resourceMap.get(species) || species}
          />
        )
      )
    }
    if (Array.isArray(value)) {
      const arr = value.map((val) => (
        <ResourceLink
          key={val}
          field={key}
          id={getId(val)}
          name={resourceMap.get(val) || val}
        />
      ))
      return <div className="detail-list-value">{arr}</div>
    } else return resourceMap.get(value) || value
  }

  return (
    <main>
      <div className="detail-container">
        <img
          className="detail-image"
          src={imageUrl}
          alt={data.title ?? data.name}
        />
        <div className="detail">
          {keys.map(
            (key) =>
              !!data[key] &&
              data[key].length > 0 && (
                <div className="detail-row" key={key}>
                  <div className="detail-attribute">
                    {key.toLowerCase().replaceAll('_', ' ')}:
                  </div>
                  <div className="detail-value">{displayValue(key)}</div>
                </div>
              ),
          )}
        </div>
      </div>
    </main>
  )
}
export default DetailPage
