import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/project.dart';
import 'api_service.dart';

final projectServiceProvider = Provider<ProjectService>((ref) {
  return ProjectService(ref.watch(apiServiceProvider));
});

final projectsProvider = FutureProvider<List<Project>>((ref) async {
  return ref.read(projectServiceProvider).getProjects();
});

class ProjectService {
  final ApiService _apiService;

  ProjectService(this._apiService);

  Future<List<Project>> getProjects() async {
    final data = await _apiService.get('/projects');
    if (data is List) {
      return data.map((json) => Project.fromJson(json)).toList();
    }
    return [];
  }

  Future<Project> createProject(Project project) async {
    final data = await _apiService.post('/projects', data: project.toJson());
    return Project.fromJson(data);
  }

  Future<Project> updateProject(String id, Project project) async {
    final data = await _apiService.patch('/projects/$id', data: project.toJson());
    return Project.fromJson(data);
  }

  Future<void> deleteProject(String id) async {
    await _apiService.delete('/projects/$id');
  }
}
