class Admin {
  constructor({ firstName, lastName, email }) {
    //public
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = null;
    this.dateOfBirth = new Date("1990-01-01");
    this.gender = "male";
    this.address = null;
    this.role = "admin";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default Admin;
