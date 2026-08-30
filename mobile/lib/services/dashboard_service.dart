import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'api_service.dart';

final dashboardServiceProvider = Provider<DashboardService>((ref) {
  return DashboardService(ref.watch(apiServiceProvider));
});

final dashboardDataProvider = FutureProvider<Map<String, dynamic>>((ref) async {
  return ref.read(dashboardServiceProvider).getDashboardData();
});

class DashboardService {
  final ApiService _apiService;

  DashboardService(this._apiService);

  Future<Map<String, dynamic>> getDashboardData() async {
    final data = await _apiService.get('/dashboard');
    return data as Map<String, dynamic>;
  }
}
