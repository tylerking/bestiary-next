import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const client = await clientPromise
    const db = client.db('bestiary')

    const creatures = await db
      .collection('creatures')
      .find({})
      .limit(99)
      .toArray()

    res.json(creatures)
  } catch (e) {
    console.error(e)
  }
}

export default handler