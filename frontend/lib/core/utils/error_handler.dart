class ErrorHandler {
  static String getErrorMessage(dynamic error) {
    if (error != null) {
      return error.toString();
    }
    return 'An unexpected error occurred. Please try again.';
  }
}
