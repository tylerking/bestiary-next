import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Creatures from '../components/Creatures'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>American Bestiary</title>
        <meta name="description" content="Famous Mythical Creatures of the United States" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Creatures/>
    </div>
  )
}
