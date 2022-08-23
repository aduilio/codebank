import { Avatar, Box, Button, Grid, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import http from '../../../http'
import { Product } from '../../../model'

interface OrderPageProps {
    product: Product
}

const ProductDetailPage: NextPage<OrderPageProps> = ({product}) => {
    return (
        <div>
            <Head>
                <title>Payment</title>
            </Head>
            <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
                Checkout
            </Typography>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={product.image_url}/>
                </ListItemAvatar>
                <ListItemText
                    primary={product.name}
                    secondary={product.price}
                />
            </ListItem>
            <Typography component="h2" variant="h6" color="textPrimary" gutterBottom>
                Pay using the credit card
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField label="Name" required fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField label="Number" type="number" required fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField label="CVV" type="number" required fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField label="Expiration month" required type="number" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Expiration year" required type="number" fullWidth/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box marginTop={3}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Pay
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default ProductDetailPage

export const getServerSideProps: GetServerSideProps<OrderPageProps, {slug: string}> = async (context) => {
    const {slug} = context.params!;
    try {
        const { data: product } = await http.get(`products/${slug}`);
        console.log(product);
        return {
            props: {
                product,
            }
        };
    } catch(e) {
        if (axios.isAxiosError(e) && e.response?.status == 404) {
            return {notFound: true};
        }
        throw e;
    }
};