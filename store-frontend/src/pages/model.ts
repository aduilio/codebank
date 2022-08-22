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