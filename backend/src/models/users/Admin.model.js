class Admin {
  constructor({ firstName, lastName, email, permissions }) {
    //private
    this.permissions = permissions; //["MANAGE_USERS", "VIEW_BOOKINGS", "MANAGE_FLIGHTS"]
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
