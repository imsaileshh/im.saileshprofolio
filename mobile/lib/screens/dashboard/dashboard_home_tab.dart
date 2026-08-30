import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../theme/app_colors.dart';
import '../../widgets/metric_card.dart';
import '../../services/dashboard_service.dart';

class DashboardHomeTab extends ConsumerStatefulWidget {
  final Function(int) onNavigate;

  const DashboardHomeTab({super.key, required this.onNavigate});

  @override
  ConsumerState<DashboardHomeTab> createState() => _DashboardHomeTabState();
}

class _DashboardHomeTabState extends ConsumerState<DashboardHomeTab> {
  String _selectedTimeRange = '7D';

  String _getGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  Widget _buildTopHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  _getGreeting(),
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(width: 6),
                const Text('👋', style: TextStyle(fontSize: 13)),
              ],
            ),
            const SizedBox(height: 2),
            const Text(
              'Sailesh P',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
                letterSpacing: -0.5,
              ),
            ),
            const Text(
              'Portfolio Dashboard',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w400,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
        Row(
          children: [
            Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.border),
              ),
              child: IconButton(
                icon: const Icon(Icons.notifications_outlined, size: 20, color: AppColors.textPrimary),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('No new notifications')));
                },
              ),
            ),
            const SizedBox(width: 12),
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.surfaceHighlight,
                border: Border.all(color: AppColors.border),
                image: const DecorationImage(
                  image: NetworkImage('https://i.pravatar.cc/150?img=11'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildLiveVisitorsCard(int visitors) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 10,
                height: 10,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.success,
                  boxShadow: [
                    BoxShadow(color: Color(0x6622C55E), blurRadius: 6, spreadRadius: 2),
                  ],
                ),
              ),
              const SizedBox(width: 10),
              Text(
                '$visitors Live Visitors',
                style: const TextStyle(color: AppColors.textPrimary, fontSize: 14, fontWeight: FontWeight.w600),
              ),
            ],
          ),
          const Text('Active on portfolio', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildSummaryGrid(Map<String, dynamic> stats) {
    final summaryData = [
      (title: 'Projects', value: '${stats["projects"] ?? 0}', icon: Icons.folder_outlined, trend: 'Active', isPositive: true),
      (title: 'Messages', value: '${stats["messages"] ?? 0}', icon: Icons.chat_bubble_outline, trend: 'Unread', isPositive: false),
      (title: 'Page Views', value: '${stats["views"] ?? 0}', icon: Icons.visibility_outlined, trend: 'Total', isPositive: true),
      (title: 'CV Downloads', value: '${stats["downloads"] ?? 0}', icon: Icons.download_outlined, trend: 'Total', isPositive: true),
    ];

    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2, crossAxisSpacing: 12, mainAxisSpacing: 12, childAspectRatio: 1.45,
      ),
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: summaryData.length,
      itemBuilder: (context, index) {
        final item = summaryData[index];
        return MetricCard(
          title: item.title, value: item.value, icon: item.icon, trend: item.trend, isPositiveTrend: item.isPositive,
        );
      },
    );
  }

  Widget _buildAnalyticsPreview(List<dynamic>? dynamicChartData) {
    List<FlSpot> spots = [];
    double maxY = 100;
    
    if (dynamicChartData != null && dynamicChartData.isNotEmpty) {
      for (int i = 0; i < dynamicChartData.length; i++) {
        double val = (dynamicChartData[i] as num).toDouble();
        spots.add(FlSpot(i.toDouble(), val));
        if (val > maxY) maxY = val + 20; // Add some headroom
      }
    } else {
      spots = const [FlSpot(0, 0), FlSpot(1, 0), FlSpot(2, 0), FlSpot(3, 0), FlSpot(4, 0), FlSpot(5, 0), FlSpot(6, 0)];
    }

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Visitors Overview', style: TextStyle(color: AppColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w600)),
              Row(
                children: ['7D', '30D', '90D'].map((range) {
                  final isSelected = _selectedTimeRange == range;
                  return GestureDetector(
                    onTap: () => setState(() => _selectedTimeRange = range),
                    child: Container(
                      margin: const EdgeInsets.only(left: 6),
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.primary : AppColors.surfaceHighlight,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(range, style: TextStyle(fontSize: 12, fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500, color: isSelected ? Colors.white : AppColors.textSecondary)),
                    ),
                  );
                }).toList(),
              ),
            ],
          ),
          const SizedBox(height: 18),
          SizedBox(
            height: 140,
            child: LineChart(
              LineChartData(
                gridData: const FlGridData(show: false),
                titlesData: const FlTitlesData(
                  rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                ),
                borderData: FlBorderData(show: false),
                minX: 0, maxX: 6, minY: 0,
                maxY: maxY,
                lineBarsData: [
                  LineChartBarData(
                    spots: spots, isCurved: true, curveSmoothness: 0.35, color: AppColors.primary, barWidth: 2.5, isStrokeCapRound: true, dotData: const FlDotData(show: false),
                    belowBarData: BarAreaData(show: true, gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [AppColors.primary.withOpacity(0.25), AppColors.primary.withOpacity(0.0)])),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions() {
    final actions = [
      (label: '+ Add Project', icon: Icons.add_circle_outline, onTap: () => widget.onNavigate(2)),
      (label: 'View Messages', icon: Icons.chat_bubble_outline, onTap: () => widget.onNavigate(3)),
      (label: 'Edit Portfolio', icon: Icons.edit_note, onTap: () => widget.onNavigate(4)),
      (label: 'View Analytics', icon: Icons.bar_chart_outlined, onTap: () => widget.onNavigate(1)),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Quick Actions', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
        const SizedBox(height: 12),
        Row(
          children: actions.map((act) => Expanded(
            child: GestureDetector(
              onTap: act.onTap,
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 4),
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
                child: Column(
                  children: [
                    Icon(act.icon, color: AppColors.primary, size: 24),
                    const SizedBox(height: 8),
                    Text(act.label, style: const TextStyle(color: AppColors.textPrimary, fontSize: 11, fontWeight: FontWeight.w500)),
                  ],
                ),
              ),
            ),
          )).toList(),
        ),
      ],
    );
  }

  Widget _buildRecentActivity(List<dynamic> activities) {
    if (activities.isEmpty) return const SizedBox();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Recent Activity', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.border)),
          child: ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: activities.length,
            separatorBuilder: (context, index) => const Divider(color: AppColors.border, height: 1),
            itemBuilder: (context, index) {
              final act = activities[index];
              IconData icon = Icons.notifications_outlined;
              if (act['type'] == 'MESSAGE') icon = Icons.chat_bubble_outline;
              if (act['type'] == 'PROJECT') icon = Icons.folder_outlined;

              // Very simple relative time formatting
              final dt = DateTime.parse(act['time']).toLocal();
              final diff = DateTime.now().difference(dt);
              String timeStr = '${diff.inHours}h ago';
              if (diff.inDays > 0) timeStr = '${diff.inDays}d ago';
              if (diff.inHours == 0) timeStr = '${diff.inMinutes}m ago';

              return ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                leading: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(color: AppColors.surfaceHighlight, borderRadius: BorderRadius.circular(10)),
                  child: Icon(icon, size: 18, color: AppColors.primary),
                ),
                title: Text(act['title'], style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
                subtitle: Text(act['desc'], style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                trailing: Text(timeStr, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
              );
            },
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final dashboardData = ref.watch(dashboardDataProvider);

    return SafeArea(
      child: RefreshIndicator(
        backgroundColor: AppColors.surface,
        color: AppColors.primary,
        onRefresh: () async {
          return ref.refresh(dashboardDataProvider.future);
        },
        child: dashboardData.when(
          data: (data) {
            final stats = data['stats'] ?? {};
            final activities = data['activity'] ?? [];
            return SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildTopHeader(),
                  const SizedBox(height: 16),
                  _buildLiveVisitorsCard(stats['liveVisitors'] ?? 1),
                  const SizedBox(height: 16),
                  _buildSummaryGrid(stats),
                  const SizedBox(height: 20),
                  _buildAnalyticsPreview(stats['chartData']),
                  const SizedBox(height: 20),
                  _buildQuickActions(),
                  const SizedBox(height: 20),
                  _buildRecentActivity(activities),
                  const SizedBox(height: 24),
                ],
              ),
            );
          },
          loading: () => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
          error: (error, stack) => Center(child: Text('Error: $error', style: const TextStyle(color: AppColors.error))),
        ),
      ),
    );
  }
}
