export interface PaginationResponse<T> {
    total: number;
    data?: T[];
    pageSize: number;
}

export interface Product{

  id: number;
  name: string;
  quantity?: number;
  image: string | null;
  price?: number;
  isAvailable?: boolean;
  description: string | null;
  shop: {
    name: string;
    id: number;
  };
  createdAt: Date;
  updatedAt: Date;
}


export interface Query{
  limit: number;
  offset: number;
  last?: number;
  first?: number;
  search?: string;
  order?:string[]
}
