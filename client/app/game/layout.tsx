import DefaultLayout from '@/app/(default)/layout'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DefaultLayout>
        {children}
      </DefaultLayout>
    </>
  )
}
