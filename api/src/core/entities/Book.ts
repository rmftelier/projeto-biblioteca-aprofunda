export class Book {
<<<<<<< HEAD
  constructor(
    public title: string,
    public author: string,
    public publishedYear: number,
=======

  constructor(
    public title: string,
    public author: string,
    public publishedAt: Date,
>>>>>>> main
    public format: string,
    public pages: number,
    public genres: string[],
    public language: string,
    public id?: string
  ) { }
}
