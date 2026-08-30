import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/auth_service.dart';
import '../../theme/app_colors.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  Future<void> _handleLogout(BuildContext context, WidgetRef ref) async {
    final bool? shouldLogout = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.border),
        ),
        title: const Text(
          'Logout',
          style: TextStyle(
            color: AppColors.textPrimary,
            fontWeight: FontWeight.bold,
          ),
        ),
        content: const Text(
          'Are you sure you want to end your administrative session?',
          style: TextStyle(color: AppColors.textSecondary),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text(
              'Cancel',
              style: TextStyle(color: AppColors.textSecondary),
            ),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.error,
              foregroundColor: Colors.white,
            ),
            child: const Text('Logout'),
          ),
        ],
      ),
    );

    if (shouldLogout == true && context.mounted) {
      final authService = ref.read(authServiceProvider);
      await authService.logout();
      if (context.mounted) {
        Navigator.of(context).pushNamedAndRemoveUntil(
          '/login',
          (route) => false,
        );
      }
    }
  }

  void _showFeatureNotice(BuildContext context, String feature) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$feature management module is configured for Phase 2.'),
        duration: const Duration(seconds: 2),
        backgroundColor: AppColors.surfaceHighlight,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 8.0, bottom: 8.0),
          child: Text(
            'PORTFOLIO CONTENT',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: AppColors.textMuted,
              letterSpacing: 1.0,
            ),
          ),
        ),
        _buildItemCard(
          context,
          icon: Icons.people_outline,
          title: 'Visitors',
          subtitle: 'Live traffic, geolocations and analytics',
          onTap: () => _showFeatureNotice(context, 'Visitors'),
        ),
        _buildItemCard(
          context,
          icon: Icons.code,
          title: 'Skills',
          subtitle: 'Technical stack & proficiency levels',
          onTap: () => _showFeatureNotice(context, 'Skills'),
        ),
        _buildItemCard(
          context,
          icon: Icons.work_outline,
          title: 'Experience',
          subtitle: 'Career timeline & work history',
          onTap: () => _showFeatureNotice(context, 'Experience'),
        ),
        _buildItemCard(
          context,
          icon: Icons.school_outlined,
          title: 'Education',
          subtitle: 'Degrees & certifications',
          onTap: () => _showFeatureNotice(context, 'Education'),
        ),
        _buildItemCard(
          context,
          icon: Icons.picture_as_pdf_outlined,
          title: 'Resume',
          subtitle: 'Download link & CV updates',
          onTap: () => _showFeatureNotice(context, 'Resume'),
        ),
        const SizedBox(height: 16),
        const Padding(
          padding: EdgeInsets.only(left: 8.0, bottom: 8.0),
          child: Text(
            'PREFERENCES & SYSTEM',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: AppColors.textMuted,
              letterSpacing: 1.0,
            ),
          ),
        ),
        _buildItemCard(
          context,
          icon: Icons.notifications_outlined,
          title: 'Notifications',
          subtitle: 'Push notifications & activity alerts',
          onTap: () => _showFeatureNotice(context, 'Notifications'),
        ),
        _buildItemCard(
          context,
          icon: Icons.security_outlined,
          title: 'Settings & Security',
          subtitle: 'Biometrics & 4-digit PIN setup',
          onTap: () => _showFeatureNotice(context, 'Security'),
        ),
        const SizedBox(height: 16),
        Container(
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: AppColors.border),
          ),
          child: ListTile(
            leading: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.error.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.logout, color: AppColors.error, size: 20),
            ),
            title: const Text(
              'Logout',
              style: TextStyle(
                color: AppColors.error,
                fontWeight: FontWeight.w600,
                fontSize: 15,
              ),
            ),
            subtitle: const Text(
              'End session and lock portfolio admin',
              style: TextStyle(
                color: AppColors.textSecondary,
                fontSize: 13,
              ),
            ),
            onTap: () => _handleLogout(context, ref),
          ),
        ),
        const SizedBox(height: 32),
      ],
    );
  }

  Widget _buildItemCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8.0),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border),
      ),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.surfaceHighlight,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: AppColors.primary, size: 20),
        ),
        title: Text(
          title,
          style: const TextStyle(
            color: AppColors.textPrimary,
            fontWeight: FontWeight.w600,
            fontSize: 15,
          ),
        ),
        subtitle: Text(
          subtitle,
          style: const TextStyle(
            color: AppColors.textSecondary,
            fontSize: 12,
          ),
        ),
        trailing: const Icon(
          Icons.chevron_right,
          size: 20,
          color: AppColors.textMuted,
        ),
        onTap: onTap,
      ),
    );
  }
}
