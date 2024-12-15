class Admin {
  generateAdminId() {
    const timestamp = Date.now();
    return `AD#${timestamp}`;
  }
  constructor({
    uid = null,
    firstName,
    lastName,
    email,
    phoneNumber = null || this.generateAdminId(),
    dateOfBirth = new Date("1990-01-01"),
    gender = "male",
    address = null,
    role = "admin",
    createdAt = null,
    updatedAt = null,
  }) {
    // Public attributes
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

export default Admin;
