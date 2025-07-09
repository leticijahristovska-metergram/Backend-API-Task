export interface UpdateProductRequestBody {
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    tags?: string[];
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
    };
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    thumbnail?: string;
    images?: string[];
}