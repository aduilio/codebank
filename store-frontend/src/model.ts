import { UseScrollTriggerOptions } from "@material-ui/core/useScrollTrigger/useScrollTrigger";

export interface Product {
    id: string;
    name: string;
    description: string;
    image_url: string;
    slug: string;
    price: number;
    created_at: string
}

export const products: Product[] = [
    {
        id: "uuid",
        name: "Product Name",
        description: "Product description with a lot of words to test long sentences",
        price: 50.50,
        image_url: "https://source.unsplash.com/random?product," + Math.random(),
        slug: "teste",
        created_at: "2022-10-11 10:45:21"
    },
    {
        id: "uuid",
        name: "Other Product Name",
        description: "Product description with a lot of words to test long sentences",
        price: 50.50,
        image_url: "https://source.unsplash.com/random?product," + Math.random(),
        slug: "other",
        created_at: "2022-10-11 10:45:21"
    }
]