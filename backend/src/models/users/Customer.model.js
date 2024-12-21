class Customer {
  constructor({
    firstName,
    lastName,
    email,
    identificationNumber = null,
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
    // Private
    this.passportNumber = passportNumber;
    this.loyaltyPoints = loyaltyPoints;
    this.bookingHistory = bookingHistory; // elementType: bookingID

    // Public
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.identificationNumber = identificationNumber;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      identificationNumber: this.identificationNumber,
      uid: this.uid,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      address: this.address,
      role: this.role,
      passportNumber: this.passportNumber,
      loyaltyPoints: this.loyaltyPoints,
      bookingHistory: this.bookingHistory,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Customer;
