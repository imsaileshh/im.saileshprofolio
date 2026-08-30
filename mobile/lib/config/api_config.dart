class ApiConfig {
  // Replace with actual production URL or retrieve from environment
  static const String baseUrl = 'http://localhost:3000/api';

  // Example API endpoints based on the Next.js API structure
  static const String authLogin = '/auth/login';
  static const String authVerifyPin = '/auth/verify-pin';
  static const String analyticsOverview = '/analytics';
  static const String visitors = '/analytics/visitors';
  static const String projects = '/projects';
  static const String skills = '/skills';
  static const String experience = '/experience';
  static const String education = '/education';
  static const String resume = '/resume';
  static const String messages = '/contact';
  static const String notifications = '/notifications';
}
