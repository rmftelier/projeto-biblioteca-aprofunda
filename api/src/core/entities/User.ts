export class User {
  constructor(
    public name: string,
    public login: string,
    public password: string,
    public email: string,
    public role: 'admin' | 'user' = 'user',
    public id?: string
  ) { }
}