interface KakaoBook {
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

export interface KakaoBookResponse {
  documents: KakaoBook[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

interface BookCore {
  title: string;
  authors: string;
  coverUrl: string;
  publisher: string;
}

export interface BookSummary extends BookCore {
  isbn: string;
  publishedYear: number;
}

export interface RecordBook extends BookCore {
  id: string;
  isbn: string;
  publishedYear: number;
}

export interface BookListItem extends BookCore {
  id: string;
}
