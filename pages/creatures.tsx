import Head from 'next/head'
import Creatures from '../components/Creatures'

export default function Home() {
  return (
    <div>
      <Head>
        <title>American Bestiary</title>
        <meta name='description' content='Famous Mythical Creatures of the United States' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Creatures/>
    </div>
  )
}
