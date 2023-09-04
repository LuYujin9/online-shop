declare module "../data" {
  export const products: {
    id: number;
    name: string;
    colors: string[];
    sizes: string[];
    description: string;
    stock: number;
    comments: string[];
    isFavorite: boolean;
    isInShoppingCart: boolean;
    photos: string[];
    price: number;
  }[];
}
