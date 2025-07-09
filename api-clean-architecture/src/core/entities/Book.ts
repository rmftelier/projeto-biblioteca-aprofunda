export class Book {
  public readonly id: string;

  constructor(
    id: string,
    public title: string,
    public author: string,
    public publishedAt: string,
    public format: string,
    public pages: number,
    public genres: string[],
    public language: string,
    public createdAt: string
  ) {
    this.id = id;
  }
}
