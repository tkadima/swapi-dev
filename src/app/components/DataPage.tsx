import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/app/fetchers'
import TableView from '@/app/components/TableView'
import { useAppContext } from '@/app/components/AppContext'

type DataPageProps<T> = {
  title: string
  columns: any[]
  initialData: T[]
  initialNextPage: string | null
  transformData: (data: T[], resourceMap: Map<string, string>) => T[]
}

const DataPage = <T,>({
  title,
  columns,
  initialData,
  initialNextPage,
  transformData,
}: DataPageProps<T>) => {
  const [data, setData] = useState<T[]>(initialData)
  const [next, setNext] = useState(initialNextPage)
  const { data: nextPageData, error } = useSWR(next, fetcher, {
    revalidateOnFocus: false,
  })

  const resourceMap = useAppContext()

  const handleFetchNextPage = useCallback(() => {
    if (nextPageData) {
      setData((prevData) => [...prevData, ...nextPageData.results])
      setNext(nextPageData.next)
    }
  }, [nextPageData])

  useEffect(() => {
    if (next && nextPageData) {
      handleFetchNextPage()
    }
  }, [next, nextPageData, handleFetchNextPage])

  if (error) return <div>Failed to load</div>

  return (
    <main>
      <TableView
        title={title}
        rows={transformData(data, resourceMap)}
        columns={columns}
      />
    </main>
  )
}

export default DataPage
