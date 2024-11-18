class User {
  constructor({ username, email, password, createdAt, updatedAt }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

export default User;
