module.exports = {
  ERRORS: {

    someThingWentWrong: "Something went wrong",

    //USER ERRORS
    passwordInvalid: "Invalid password!",
    accountExists: "Account exists with this email!",
    userNotExists: "User does not exist!",
    userAlreadyExists: "User already exists with this email!",
    tokenInvalid: "Unauthorized access: Token not found",
    userNotFound: "Unauthorized access: User does not exist",
    unAuthorized: "Unauthorized access",
    emailInvalid: "Invalid Email",
    tokenExpired: "Token expired!",

    //APPOINTMENT ERRORS
    appointmentNotFound: "Appointment not found!",
    appointmentAlreadyExist: "Appointment already exist!",

    //SHOP ERRORS
    shopNotFound: "Shop not found!",
    shopAlreadyExist: "Shop already exist!",

    //REVIEW ERRORS
    reviewNotFound: "Review not found!",
    reviewAlreadyExist: "Review already exist!",

    // APPOINTMENR ERRORS
    dateTimeAlreadyExist: "Date time already exist",
  },

  TEXTS: {
    userCreated: "User created successfully",
    userLogin: "User login successfully",
    userLoggedOut: "User logout successfully",
    userUpdated: "User updated successfully",
    passwordUpdated: "Password updated successfully",

    userAlreadyRegisteredWithEmail:
      "User is already registered with this email",

    accountDeleted: "Account deleted successfully",

    profileData: "Profile Data",
    profileUpdated: "Profile Updated",

    // appointments
    appointmentCreated: "Appointment created successfully!",
    appointmentsFetched: "Appointments fetched successfully!",
    appointmentUpdated: "Appointments updated successfully!",
    appointmentDeleted: "Appointments deleted successfully!",

    // shop
    shopCreated: "Shop created successfully!",
    shopFetched: "Shop fetched successfully!",
    shopUpdated: "Shop updated successfully!",
    shopDeleted: "Shop deleted successfully!",

    // review
    reviewCreated: "Review created successfully!",
    reviewFetched: "Review fetched successfully!",
    reviewUpdated: "Review updated successfully!",
    reviewDeleted: "Review deleted successfully!",

    // NOTIFICATIONS
    appointmentCreatedTitle: "New slot booked",
    appointmentCreatedDescription: "A new slot booked at ",
  },

  STATUS_CODE: {
    NOT_FOUND: 404,
    EXISTS: 400,
    INTERNAL_SERVER_ERROR: 500,
    SUCCESS: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
  },
};
