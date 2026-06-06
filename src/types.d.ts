export interface Category {
    title: string;
    id: string;
}

export interface Product {
    id?: string;
    type: string;
    title: string;
    description?: string;
    picture?: string;
    price: number;
}

