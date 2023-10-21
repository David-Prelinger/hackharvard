// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   // api key c9a4a0e489737ef5f7f7f12b2c1d6df4
  res.status(200).json({ name: 'John Doe' })
}
