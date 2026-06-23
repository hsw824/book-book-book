interface KaKaoBook {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

export interface KakaoBookResponese {
  documents: KaKaoBook[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

export interface Book {
  authors: string;
  contents: string;
  datetime: string;
  publisher: string;
  thumbnail: string;
  title: string;
  translators: string;
  url: string;
  isbn: string;
}
