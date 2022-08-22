import { Typography } from "@material-ui/core";
import { NextPage } from "next";
import Head from "next/head";

const Page404: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Page not found :(</title>
            </Head>
            <Typography
                component="h2"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                404 - Page not found
            </Typography>
        </div>
    );
};

export default Page404;