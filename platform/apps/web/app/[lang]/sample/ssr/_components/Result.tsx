export function Result({ source, data }: { source: string; data: unknown }) {
  return (
    <div>
      <span>Source: {source}</span>
      <span>
        Data:
        {JSON.stringify(data)}
      </span>
    </div>
  )
}
