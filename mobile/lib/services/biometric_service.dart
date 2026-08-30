import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';

final biometricServiceProvider = Provider<BiometricService>((ref) {
  return BiometricService();
});

class BiometricService {
  final LocalAuthentication _auth = LocalAuthentication();

  Future<bool> isBiometricAvailable() async {
    try {
      final bool canAuthenticateWithBiometrics = await _auth.canCheckBiometrics;
      final bool canAuthenticate =
          canAuthenticateWithBiometrics || await _auth.isDeviceSupported();
      return canAuthenticate;
    } on PlatformException {
      return false;
    }
  }

  Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _auth.getAvailableBiometrics();
    } on PlatformException {
      return <BiometricType>[];
    }
  }

  Future<({bool success, String? error})> authenticate({
    String reason = 'Authenticate to access Sailesh P Portfolio Admin',
  }) async {
    try {
      final isAvailable = await isBiometricAvailable();
      if (!isAvailable) {
        return (
          success: false,
          error: 'Biometric authentication is not available on this device.'
        );
      }

      final didAuthenticate = await _auth.authenticate(
        localizedReason: reason,
      );

      if (didAuthenticate) {
        return (success: true, error: null);
      } else {
        return (
          success: false,
          error: 'Authentication cancelled or not recognized.'
        );
      }
    } on PlatformException catch (e) {
      String errorMessage;
      switch (e.code) {
        case 'NotEnrolled':
          errorMessage =
              'No biometrics enrolled. Please set up fingerprint in device settings.';
          break;
        case 'LockedOut':
        case 'PermanentlyLockedOut':
          errorMessage =
              'Biometric sensor locked due to too many attempts. Please use your PIN.';
          break;
        case 'PasscodeNotSet':
          errorMessage = 'Device lock passcode not set.';
          break;
        case 'NotAvailable':
          errorMessage = 'Biometrics not available on this device.';
          break;
        default:
          errorMessage = e.message ?? 'Biometric authentication failed.';
      }
      return (success: false, error: errorMessage);
    } catch (e) {
      return (success: false, error: 'An unexpected biometric error occurred.');
    }
  }
}
