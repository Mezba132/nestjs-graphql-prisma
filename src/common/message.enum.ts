export enum AppMessage {
  ROOT_API_MESSAGE = 'API is running',

  INVALID_CREDENTIALS = 'Invalid credentials',
  USERNAME_ALREADY_EXISTS = 'Username already exists',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  ALREADY_EXISTS = 'Already exists',
  AUTHENTICATED_USER = 'Authenticated user',
  REGISTER_SUCCESS = 'Register success',
  LOGOUT_SUCCESS = 'Logout success',
  LOGIN_SUCCESS = 'Login success',
  TOKEN_REFRESH = 'New token generated using refresh token',
  EMAIL_VERIFIED = 'Email verified',
  EMAIL_NOT_CONFIRMED = 'Email not confirmed',
  PASSWORD_CHANGE_SUCCESS = 'Your password hasbeen changed successfully!',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',

  INVALID_DATA = 'Invalid Data',
  DELETE_SUCCESS = 'Delete Success',

  NOT_FOUND = 'Not found!',
  NOT_YOU = 'This user is not you',

  DELETE = 'Item delete successfully!',
  ERROR = 'Something went wrong!',
}
