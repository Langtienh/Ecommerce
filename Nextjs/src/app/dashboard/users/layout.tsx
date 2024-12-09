export const metadata = {
  title: 'User manager',
  description: 'User manager.'
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
