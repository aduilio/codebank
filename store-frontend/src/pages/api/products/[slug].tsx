import type { NextApiRequest, NextApiResponse } from 'next'
import { Product, products } from '../../../model'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
    const {slug} = req.query;
    console.log(slug)
    const product = products.find(p => p.slug === slug);
    console.log(product)
    product ? res.status(200).json(product) : res.status(404);
}
