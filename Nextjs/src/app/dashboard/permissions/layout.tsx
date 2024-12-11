export const metadata = {
  title: 'Permission manager',
  description: 'Permission manager.'
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
