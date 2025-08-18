interface ProductToSearch {
  id: string;
  name: string;
  description: string;
  price: number;
  article: string;
  rating: number;
  quantitySold: number;
  url: string;
  countComments: number;
}

interface ProductSearchList {
  productForSearchList: ProductToSearch[];
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface Links {
  self: {
    href: string;
  };
}

interface ApiResponse {
  _embedded: ProductSearchList;
  _links: Links;
  page: Page;
}
