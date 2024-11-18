import User from "./User.model";

class Customer extends User {
  constructor({ id, username, email, password, createdAt, updatedAt }) {
    super({ id, username, email, password, createdAt, updatedAt });
    this.address = address || "";
    this.phoneNumber = phoneNumber || "";
  }
}

export default Customer;
