import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Gaël's Logo 128">
      <Image
        src={process.env.NEXT_PUBLIC_IMAGE_PATH + '/v1709227789/main/logo128.png'}
        alt="Gaël's Logo 128"
        className="logo-128 rounded-full"
        width="32"
        height="32"
      />
    </Link>
  )
}
