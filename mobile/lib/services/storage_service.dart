import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storageServiceProvider = Provider<StorageService>((ref) {
  return StorageService();
});

class StorageService {
  final FlutterSecureStorage _secureStorage;

  StorageService({FlutterSecureStorage? secureStorage})
      : _secureStorage = secureStorage ?? const FlutterSecureStorage();

  // Keys
  static const String _tokenKey = 'auth_token';
  static const String _pinKey = 'auth_pin';
  static const String _biometricEnabledKey = 'biometric_enabled';
  static const String _sessionUserKey = 'session_user';

  Future<void> saveToken(String token) async {
    await _secureStorage.write(key: _tokenKey, value: token);
  }

  Future<String?> getToken() async {
    return await _secureStorage.read(key: _tokenKey);
  }

  Future<void> deleteToken() async {
    await _secureStorage.delete(key: _tokenKey);
  }

  Future<void> savePin(String pin) async {
    await _secureStorage.write(key: _pinKey, value: pin);
  }

  Future<String?> getPin() async {
    return await _secureStorage.read(key: _pinKey);
  }

  Future<void> deletePin() async {
    await _secureStorage.delete(key: _pinKey);
  }

  Future<void> setBiometricEnabled(bool enabled) async {
    await _secureStorage.write(
      key: _biometricEnabledKey,
      value: enabled.toString(),
    );
  }

  Future<bool> isBiometricEnabled() async {
    final val = await _secureStorage.read(key: _biometricEnabledKey);
    return val == 'true';
  }

  Future<void> saveSessionUser(String userEmail) async {
    await _secureStorage.write(key: _sessionUserKey, value: userEmail);
  }

  Future<String?> getSessionUser() async {
    return await _secureStorage.read(key: _sessionUserKey);
  }

  Future<void> clearSession() async {
    await _secureStorage.delete(key: _tokenKey);
    await _secureStorage.delete(key: _sessionUserKey);
  }

  Future<void> clearAll() async {
    await _secureStorage.deleteAll();
  }
}
