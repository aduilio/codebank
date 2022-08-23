import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import axios from 'axios'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import http from '../../../http'
import { Product } from '../../../model'

interface ProductDetailsPageProps {
    product: Product
}

const ProductDetailPage: NextPage<ProductDetailsPageProps> = ({product}) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Carregando...</div>
    }

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
                    <Link 
                        href="/products/[slug]/order"
                        as={`/products/${product.slug}/order`}
                        passHref
                    >
                         <Button size="small" color="primary" component="a">Buy</Button>
                    </Link>
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

export const getStaticProps: GetStaticProps<ProductDetailsPageProps, {slug: string}> = async (context) => {
    const {slug} = context.params!;
    try {
        console.log(slug);
        const { data: product } = await http.get(`products/${slug}`);
        console.log(product);
        return {
            props: {
                product,
            },
            revalidate: 1 * 60 * 2,
        };
    } catch(e) {
        console.log(e);
        if (axios.isAxiosError(e) && e.response?.status == 404) {
            return {notFound: true};
        }
        throw e;
    }
  };

export const getStaticPaths: GetStaticPaths = async (context) => {
    const { data: products } = await http.get(`products`);
  
    const paths = products.map((p: Product) => ({
        params: { slug: p.slug },
    }));
  
    return { paths, fallback: "blocking" };
};