import User from "./User.model";

class Admin extends User {
  constructor({
    username,
    email,
    password,
    permissions,
    createdAt,
    updatedAt,
  }) {
    super({ username, email, password, createdAt, updatedAt });
    this.role = "admin";
    this.permissions = permissions || [];
  }
}

export default Admin;
