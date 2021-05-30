class User {
  public id: string;
  public name: string;
  public email: string;
  public token: string;
  public password: string;
  public isAdmin?: boolean;

  constructor(id: string, name: string, email: string, token: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
    this.password = password;
  }
}

export default User;
