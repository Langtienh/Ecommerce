export default function SmemberPage({ params: { page } }: { params: { page: string } }) {
  return (
    <div>
      <h1>{page}</h1>
    </div>
  )
}
