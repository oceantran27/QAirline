class Customer {
  constructor({ firstName, lastName, email }) {
    //private
    this.passportNumber = null;
    this.loyaltyPoints = 0;
    this.bookingHistory = []; //elementType: bookingID;
    //public
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = null;
    this.dateOfBirth = new Date("1990-01-01");
    this.gender = "male";
    this.address = null;
    this.role = "customer";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default Customer;
