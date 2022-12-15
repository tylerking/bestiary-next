import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import styles from '../styles/Home.module.css'
//import Creatures from '../components/Creatures'

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db('bestiary')

    const creatures = await db
      .collection('creatures')
      .find({})
      .sort({ name: 1 })
      .limit(50)
      .toArray()

    return {
      props: { creatures: JSON.parse(JSON.stringify(creatures)) },
    }
  } catch (e) {
    console.error(e)
  }
}

const Home = ({ creatures }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>American Bestiary</title>
        <meta
          name='description'
          content='Famous Mythical Creatures of the United States'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ul>
        {creatures.map((creature: any, index: number) => (
          <li key={index}>
            <h2>{creature.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home