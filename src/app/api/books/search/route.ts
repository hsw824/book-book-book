import { KakaoBookResponese } from '@/models/bookTypes';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query');

  const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query!)}`, {
    headers: { Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}` },
  });

  const data: KakaoBookResponese = await response.json();

  const books = data.documents.map(book => ({
    authors: book.authors.join(','),
    contents: book.contents,
    datetime: book.datetime,
    publisher: book.publisher,
    thumbnail: book.thumbnail,
    title: book.title,
    translators: book.translators.join(','),
    url: book.url,
    isbn: book.isbn,
  }));

  return Response.json(books);
}
