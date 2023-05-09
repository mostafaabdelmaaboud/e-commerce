
export interface AddProductModel {
  title: string,
  price: string,
  image: string,
  description: string,
}

export interface ListUsersModel {
  title: string,
  deadline: string,
  status: string,
  user: string,
}

export interface ProductsModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  loading: boolean;
  createProductIsLoaded: boolean;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
export interface UserID {
  assignedProducts: number;
  createdAt: Date;
  email: string;
  password: string;
  role: string;
  status: string;
  updatedAt: Date;
  username: string;
  _id: string;
}

export interface Filteration {
  keyword?: string;
  userId?: string;
  status?: string;
  fromDate?: string | null;
  toDate?: string | null;
  page?: number,
  limit?: number
}
