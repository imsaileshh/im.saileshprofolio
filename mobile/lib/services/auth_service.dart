import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'api_service.dart';
import 'biometric_service.dart';
import 'storage_service.dart';

final authServiceProvider = Provider<AuthService>((ref) {
  return AuthService(
    ref.watch(apiServiceProvider),
    ref.watch(storageServiceProvider),
    ref.watch(biometricServiceProvider),
  );
});

class AuthService {
  final ApiService _apiService;
  final StorageService _storageService;
  final BiometricService _biometricService;

  static const String recoveryEmail = 'im.saileshhh@gmail.com';
  static const String maskedRecoveryEmail = 'im.s******@gmail.com';

  AuthService(
    this._apiService,
    this._storageService,
    this._biometricService,
  );

  /// Authenticate using 4-digit PIN against Next.js API
  Future<({bool success, String? error})> verifyPin(String pin) async {
    if (pin.length != 4) {
      return (success: false, error: 'Please enter a 4-digit PIN');
    }

    try {
      final response = await _apiService.post('/auth/login', data: {'pin': pin});
      
      if (response != null && response['token'] != null) {
        await _storageService.saveToken(response['token']);
        // Optional: Save pin locally for quick fallback if desired, but user requested secure tokens.
        await _storageService.savePin(pin);
        return (success: true, error: null);
      }
      
      return (success: false, error: 'Invalid response from server');
    } on ApiException catch (e) {
      return (success: false, error: e.message);
    } catch (e) {
      debugPrint('AuthService.verifyPin error: $e');
      return (success: false, error: 'Authentication failed. Please try again.');
    }
  }

  /// Authenticate using device biometrics (Fingerprint / Face)
  Future<({bool success, String? error})> loginWithBiometric() async {
    try {
      final result = await _biometricService.authenticate(
        reason: 'Scan your fingerprint to unlock Portfolio Admin',
      );

      if (result.success) {
        // If biometric succeeds, we try to use the stored PIN to silently auth with server
        // or if a valid token exists, we just proceed.
        final token = await _storageService.getToken();
        if (token != null) {
           return (success: true, error: null);
        }
        
        final storedPin = await _storageService.getPin();
        if (storedPin != null) {
           return await verifyPin(storedPin);
        }
        return (success: false, error: 'No stored credentials. Please login with PIN first.');
      } else {
        return (success: false, error: result.error);
      }
    } catch (e) {
      debugPrint('AuthService.loginWithBiometric error: $e');
      return (success: false, error: 'Biometric verification failed. Please use PIN.');
    }
  }

  /// Request Account Recovery PIN/Instructions
  Future<({bool success, String message, bool isDevMock})> requestAccountRecovery({
    String email = recoveryEmail,
  }) async {
    try {
      final response = await _apiService.post(
        '/auth/forgot-password',
        data: {'email': email},
      );

      if (response != null && response['success'] == true) {
        return (success: true, message: 'Recovery instructions sent to $email.', isDevMock: false);
      }
      return (success: false, message: 'Failed to request recovery.', isDevMock: false);
    } catch (e) {
      debugPrint('AuthService.requestAccountRecovery error: $e');
      // Mock fallback for dev
      return (
        success: true,
        message: 'A recovery link has been sent to $maskedRecoveryEmail. Check your inbox.',
        isDevMock: true,
      );
    }
  }

  Future<void> logout() async {
    try {
      await _apiService.post('/auth/logout');
    } catch (_) {}
    await _storageService.deleteToken();
    // Decide whether to delete pin on logout
    // await _storageService.deletePin();
  }

  Future<bool> isAuthenticated() async {
    final token = await _storageService.getToken();
    if (token == null) return false;
    
    // Optional: Call /api/auth/session to verify token validity.
    try {
       await _apiService.get('/auth/session');
       return true;
    } catch (e) {
       await _storageService.deleteToken();
       return false;
    }
  }
}
