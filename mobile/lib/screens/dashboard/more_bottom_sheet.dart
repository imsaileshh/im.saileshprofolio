import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/auth_service.dart';
import '../../theme/app_colors.dart';
import '../settings/settings_screen.dart';

class MoreBottomSheet extends ConsumerWidget {
  const MoreBottomSheet({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
      child: Container(
        decoration: const BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const SizedBox(height: 12),
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 24),
              _buildItem(context, Icons.work_outline, 'Experience'),
              _buildItem(context, Icons.school_outlined, 'Education'),
              _buildItem(context, Icons.code_outlined, 'Skills'),
              _buildItem(context, Icons.description_outlined, 'Resume'),
              const Divider(color: AppColors.border, height: 32),
              _buildItem(context, Icons.notifications_outlined, 'Notifications'),
              _buildItem(context, Icons.settings_outlined, 'Settings', onTap: () {
                Navigator.pop(context);
                Navigator.of(context).push(MaterialPageRoute(builder: (_) => const Scaffold(body: SettingsScreen())));
              }),
              _buildItem(context, Icons.language_outlined, 'View Portfolio'),
              const Divider(color: AppColors.border, height: 32),
              _buildItem(context, Icons.logout, 'Logout', color: AppColors.error, onTap: () async {
                Navigator.pop(context);
                final authService = ref.read(authServiceProvider);
                await authService.logout();
                if (context.mounted) {
                  Navigator.of(context).pushNamedAndRemoveUntil('/login', (route) => false);
                }
              }),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildItem(BuildContext context, IconData icon, String title, {Color? color, VoidCallback? onTap}) {
    return ListTile(
      leading: Icon(icon, color: color ?? AppColors.textPrimary),
      title: Text(title, style: TextStyle(color: color ?? AppColors.textPrimary, fontWeight: FontWeight.w500)),
      onTap: onTap ?? () {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$title selected')));
      },
    );
  }
}
