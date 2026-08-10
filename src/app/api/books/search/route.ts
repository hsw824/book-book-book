import { KakaoBookResponese } from '@/models/bookTypes';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query');

  if (!query) {
    return Response.json({ error: 'query는 필수입니다.' }, { status: 400 });
  }

  const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}`, {
    headers: { Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}` },
  });

  const data: KakaoBookResponese = await response.json();

  const books = data.documents.map(book => ({
    authors: book.authors.join(','),
    publishedYear: new Date(book.datetime).getFullYear(),
    publisher: book.publisher,
    coverUrl: book.thumbnail,
    title: book.title,
    isbn: book.isbn,
  }));

  return Response.json(books);
}
