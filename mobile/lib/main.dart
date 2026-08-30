import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'theme/app_theme.dart';
import 'theme/app_colors.dart';
import 'services/auth_service.dart';
import 'screens/login/login_screen.dart';
import 'screens/dashboard/dashboard_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: PortfolioAdminApp(),
    ),
  );
}

class PortfolioAdminApp extends ConsumerWidget {
  const PortfolioAdminApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: 'Sailesh Portfolio Admin',
      theme: AppTheme.darkTheme,
      debugShowCheckedModeBanner: false,
      home: const AuthGate(),
      routes: {
        '/login': (context) => const LoginScreen(),
        '/dashboard': (context) => const DashboardScreen(),
      },
    );
  }
}

class AuthGate extends ConsumerStatefulWidget {
  const AuthGate({super.key});

  @override
  ConsumerState<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends ConsumerState<AuthGate> {
  late Future<bool> _authCheckFuture;

  @override
  void initState() {
    super.initState();
    _authCheckFuture = _checkAuth();
  }

  Future<bool> _checkAuth() async {
    final authService = ref.read(authServiceProvider);
    final isAuthenticated = await authService.isAuthenticated();
    
    if (!isAuthenticated) {
      // Auto-login to bypass login screen
      final result = await authService.verifyPin('1010');
      if (result.success) {
        return true;
      }
    }
    return true; // Always return true to bypass login screen visually
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: _authCheckFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            backgroundColor: AppColors.background,
            body: Center(
              child: SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: AppColors.primary,
                ),
              ),
            ),
          );
        }

        final isAuthenticated = snapshot.data ?? false;
        // By default, just go to DashboardScreen since we want to bypass the login screen entirely.
        // It will either have a valid token, or it'll fail API calls gracefully.
        return const DashboardScreen();
      },
    );
  }
}
