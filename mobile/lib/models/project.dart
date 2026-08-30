class Project {
  final String id;
  final String title;
  final String slug;
  final String description;
  final String? longText;
  final List<String> technologies;
  final bool featured;
  final String? liveUrl;
  final String? githubUrl;
  final int orderIndex;
  final List<ProjectImage> images;

  Project({
    required this.id,
    required this.title,
    required this.slug,
    required this.description,
    this.longText,
    required this.technologies,
    required this.featured,
    this.liveUrl,
    this.githubUrl,
    required this.orderIndex,
    required this.images,
  });

  factory Project.fromJson(Map<String, dynamic> json) {
    return Project(
      id: json['id'] as String,
      title: json['title'] as String,
      slug: json['slug'] as String,
      description: json['description'] as String,
      longText: json['longText'] as String?,
      technologies: (json['technologies'] as List<dynamic>?)?.map((e) => e as String).toList() ?? [],
      featured: json['featured'] as bool? ?? false,
      liveUrl: json['liveUrl'] as String?,
      githubUrl: json['githubUrl'] as String?,
      orderIndex: json['orderIndex'] as int? ?? 0,
      images: (json['images'] as List<dynamic>?)?.map((e) => ProjectImage.fromJson(e)).toList() ?? [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'slug': slug,
      'description': description,
      'longText': longText,
      'technologies': technologies,
      'featured': featured,
      'liveUrl': liveUrl,
      'githubUrl': githubUrl,
      'orderIndex': orderIndex,
    };
  }
}

class ProjectImage {
  final String id;
  final String url;
  final int orderIndex;
  final bool isCover;

  ProjectImage({
    required this.id,
    required this.url,
    required this.orderIndex,
    required this.isCover,
  });

  factory ProjectImage.fromJson(Map<String, dynamic> json) {
    return ProjectImage(
      id: json['id'] as String,
      url: json['url'] as String,
      orderIndex: json['orderIndex'] as int? ?? 0,
      isCover: json['isCover'] as bool? ?? false,
    );
  }
}
