import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { Product } from './model'

const products: Product[] = [
    {
        id: "uuid",
        name: "Product name",
        description: "Product description with a lot of words to test long sentences",
        price: 50.50,
        image_url: "https://source.unsplash.com/random?product",
        slug: "teste",
        created_at: "2022-10-11 10:45:21"
    }
]

export default function ProductsListPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Products List</title>
      </Head>
      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
        Products
      </Typography>
      {products.map((product, key) => (
        <Card key={key}>
            <CardMedia image={product.image_url}/>
            <CardContent>
                <Typography component="h2" variant="h5" gutterBottom>
                    {product.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component="a">Details</Button>

            </CardActions>
        </Card>
      ))}
    </div>
  );
}
