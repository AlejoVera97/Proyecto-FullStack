import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchUsersTripData, createUserTripData } from '../../../app/lib/data'
import { UserTripData } from '../../../app/lib/definitions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const userTripData: UserTripData[] = await fetchUsersTripData()
      res.status(200).json(userTripData)
    } else if (req.method === 'POST') {
      const newUserTripData: Omit<UserTripData, 'id'> = req.body
      const createdUserTripData = await createUserTripData(newUserTripData)
      res.status(201).json(createdUserTripData)
      console.log(createdUserTripData)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
