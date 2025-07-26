export class User {
  constructor(
    public name: string,
    public login: string,
    public password: string,
    public email: string,
    public id?: string
  ) { }
}