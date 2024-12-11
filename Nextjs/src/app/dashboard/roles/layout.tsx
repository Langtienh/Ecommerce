export const metadata = {
  title: 'Role manager',
  description: 'Role manager.'
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
