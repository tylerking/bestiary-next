import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  try {
    const client = await clientPromise
    const db = client.db('bestiary')

    const creature = await db
      .collection('creatures')
      .find({"state": `${id}` })
      .limit(1)
      .toArray()

    res.json(creature)
  } catch (e) {
    console.error(e)
  }
}

export default handler