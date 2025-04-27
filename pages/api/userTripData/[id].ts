import type { NextApiRequest, NextApiResponse } from 'next'
import { updateUserTripData, deleteUserTripData } from '../../../app/lib/data'
import { UserTripData } from '@/app/lib/definitions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' })
  }

  try {
    if (req.method === 'PUT') {
      // Aquí pasamos directamente el cuerpo de la solicitud al update
      const updatedData = await updateUserTripData(id, req.body)
      return res.status(200).json(updatedData)
    }

    if (req.method === 'DELETE') {
      await deleteUserTripData(id)
      return res.status(200).json(deleteUserTripData)
    }

    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error('Error en API:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
