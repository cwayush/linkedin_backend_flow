export const MESSAGES = {
  AUTH: {
    EMAIL_IN_USE: 'Email already in use',
    USERNAME_TAKEN: 'Username already taken',
    INVALID_CREDS: 'Invalid credentials',
    SUCCESS_REGISTER: 'User registered successfully',
  },
  USER: {
    NOT_FOUND: 'User not found',
    FETCH_SELF: 'Fetching self profile',
    FETCH_PUBLIC: 'Fetching public profile',
    UPDATE_PROFILE_SUCCESS: 'Profile updated successfully',
    FETCH_FRIENDS: 'Fetching friends list',
    ADD_EXPERIENCE: 'Adding experience',
    FETCH_EXPERIENCES: 'Fetching all experiences',
    FORBIDDEN: 'Forbidden access',
    UNAUTHORIZED: 'Unauthorized',
    VALIDATION_FAILED: 'Validation failed'
  },
  SYSTEM: {
    INTERNAL_ERROR: 'Internal server error',
    SERVICE_UP: 'Service is up and running'
  }
} as const;
