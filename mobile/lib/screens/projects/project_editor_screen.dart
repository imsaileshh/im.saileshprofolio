import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../models/project.dart';
import '../../services/project_service.dart';
import '../../theme/app_colors.dart';

class ProjectEditorScreen extends ConsumerStatefulWidget {
  final Project? project;

  const ProjectEditorScreen({super.key, this.project});

  @override
  ConsumerState<ProjectEditorScreen> createState() => _ProjectEditorScreenState();
}

class _ProjectEditorScreenState extends ConsumerState<ProjectEditorScreen> {
  final _formKey = GlobalKey<FormState>();
  
  late TextEditingController _titleController;
  late TextEditingController _slugController;
  late TextEditingController _descriptionController;
  late TextEditingController _longTextController;
  late TextEditingController _liveUrlController;
  late TextEditingController _githubUrlController;
  
  bool _featured = false;
  List<String> _technologies = [];
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    final p = widget.project;
    _titleController = TextEditingController(text: p?.title ?? '');
    _slugController = TextEditingController(text: p?.slug ?? '');
    _descriptionController = TextEditingController(text: p?.description ?? '');
    _longTextController = TextEditingController(text: p?.longText ?? '');
    _liveUrlController = TextEditingController(text: p?.liveUrl ?? '');
    _githubUrlController = TextEditingController(text: p?.githubUrl ?? '');
    _featured = p?.featured ?? false;
    _technologies = p?.technologies.toList() ?? [];
  }

  @override
  void dispose() {
    _titleController.dispose();
    _slugController.dispose();
    _descriptionController.dispose();
    _longTextController.dispose();
    _liveUrlController.dispose();
    _githubUrlController.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;
    
    setState(() => _isSaving = true);
    
    try {
      final p = Project(
        id: widget.project?.id ?? '', // backend generates if new
        title: _titleController.text,
        slug: _slugController.text,
        description: _descriptionController.text,
        longText: _longTextController.text,
        liveUrl: _liveUrlController.text.isEmpty ? null : _liveUrlController.text,
        githubUrl: _githubUrlController.text.isEmpty ? null : _githubUrlController.text,
        featured: _featured,
        technologies: _technologies,
        orderIndex: widget.project?.orderIndex ?? 0,
        images: widget.project?.images ?? [],
      );

      final service = ref.read(projectServiceProvider);
      if (widget.project == null) {
        await service.createProject(p);
      } else {
        await service.updateProject(p.id, p);
      }

      if (mounted) {
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to save: $e')));
      }
    } finally {
      if (mounted) {
        setState(() => _isSaving = false);
      }
    }
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: const TextStyle(color: AppColors.textSecondary),
      filled: true,
      fillColor: AppColors.background,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: AppColors.primary),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        title: Text(widget.project == null ? 'New Project' : 'Edit Project', style: const TextStyle(color: AppColors.textPrimary)),
        backgroundColor: AppColors.surface,
        elevation: 0,
        iconTheme: const IconThemeData(color: AppColors.textPrimary),
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            const Text('Basic Information', style: TextStyle(color: AppColors.textPrimary, fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            TextFormField(
              controller: _titleController,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: _inputDecoration('Title'),
              validator: (v) => v!.isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _slugController,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: _inputDecoration('Slug (e.g. my-project)'),
              validator: (v) => v!.isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 32),
            const Text('Project Details', style: TextStyle(color: AppColors.textPrimary, fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            TextFormField(
              controller: _descriptionController,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: _inputDecoration('Short Description'),
              maxLines: 2,
              validator: (v) => v!.isEmpty ? 'Required' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _longTextController,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: _inputDecoration('Long Text (Markdown allowed)'),
              maxLines: 5,
            ),
            const SizedBox(height: 32),
            const Text('Links', style: TextStyle(color: AppColors.textPrimary, fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            TextFormField(
              controller: _liveUrlController,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: _inputDecoration('Live URL'),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _githubUrlController,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: _inputDecoration('GitHub URL'),
            ),
            const SizedBox(height: 32),
            const Text('Publishing', style: TextStyle(color: AppColors.textPrimary, fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            SwitchListTile(
              title: const Text('Featured', style: TextStyle(color: AppColors.textPrimary)),
              subtitle: const Text('Show this project on the homepage', style: TextStyle(color: AppColors.textSecondary)),
              value: _featured,
              activeTrackColor: AppColors.primary,
              onChanged: (v) => setState(() => _featured = v),
              tileColor: AppColors.background,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            const SizedBox(height: 80), // bottom padding for save button
          ],
        ),
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.all(16),
        color: AppColors.surface,
        child: SafeArea(
          child: SizedBox(
            width: double.infinity,
            height: 54,
            child: ElevatedButton(
              onPressed: _isSaving ? null : _save,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: _isSaving 
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text('Save Project', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            ),
          ),
        ),
      ),
    );
  }
}
