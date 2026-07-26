interface ShortedBookType {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  publisher: string;
}

export interface RecordType {
  id: string;
  rating: number;
  category: string;
  isEbook: boolean;
  finishedAt: string;
  book: ShortedBookType;
}
