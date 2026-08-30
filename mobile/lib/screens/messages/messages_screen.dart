import 'package:flutter/material.dart';

class MessagesScreen extends StatelessWidget {
  const MessagesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: 5,
        itemBuilder: (context, index) {
          return Card(
            child: ListTile(
              leading: const CircleAvatar(child: Icon(Icons.person)),
              title: const Text('John Doe'),
              subtitle: const Text('Interested in a collaboration...'),
              trailing: const Text('2h ago', style: TextStyle(fontSize: 12)),
              onTap: () {
                // View message
              },
            ),
          );
        },
      ),
    );
  }
}
