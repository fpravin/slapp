import { Category } from ".";

export interface Place {
    id: string;
    name: string;
    description: string;
    latlang: string;
    address: string;
    rating: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    category: Category[];
}
