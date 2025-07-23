import { Loading } from './_components/Loading'

export default async function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Sample</h1>
        <Loading />
      </div>
    </div>
  )
}
