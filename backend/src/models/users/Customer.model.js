class Customer {
  constructor({
    firstName,
    lastName,
    email,
    passportNumber = null,
    loyaltyPoints = 0,
    bookingHistory = [], // Mảng chứa booking ID
    uid = null,
    phoneNumber = null,
    dateOfBirth = new Date("1990-01-01"),
    gender = "male",
    address = null,
    role = "customer",
    createdAt = null,
    updatedAt = null,
  }) {
    //private
    this.passportNumber = passportNumber;
    this.loyaltyPoints = loyaltyPoints;
    this.bookingHistory = bookingHistory; // elementType: bookingID;

    //public
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Customer;
