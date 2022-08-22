import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Product, products } from '../../model'

interface ProductDetailsPageProps {
    product: Product
}

// const ProductDetailPage: NextPage<ProductDetailsPageProps> = ({product}) => {
const ProductDetailPage = () => {
  const product = products[0]  
  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Card>
        <CardHeader
            title={product.name.toUpperCase()}
            subheader={`R$ ${product.price}`}
        />
        <CardActions>
            <Button size="small" color="primary" component="a">Comprar</Button>
        </CardActions>
        <CardMedia style={{paddingTop: '56%'}} image={product.image_url}/>
        <CardContent>
            <Typography component="p" variant="body2" color="textSecondary">
                {product.description}
            </Typography>
        </CardContent>
        </Card>
    </div>
  );
}

export default ProductDetailPage