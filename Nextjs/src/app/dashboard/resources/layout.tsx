export const metadata = {
  title: 'Resources manager',
  description: 'Resources manager.'
}

export default function ResourceLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  )
}
