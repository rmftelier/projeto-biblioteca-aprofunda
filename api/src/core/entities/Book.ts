export class Book {
  constructor(
    public title: string,
    public author: string,
    public publishedYear: number,
    public format: string,
    public pages: number,
    public genres: string[],
    public language: string,
    public status: 'available' | 'borrowed' = 'available',
    public id?: string
  ) { }
}