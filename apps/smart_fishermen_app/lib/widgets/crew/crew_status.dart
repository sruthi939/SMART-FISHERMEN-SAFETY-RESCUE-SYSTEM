import 'package:flutter/material.dart';

class CrewStatusWidget extends StatelessWidget {
  final String status;
  const CrewStatusWidget({super.key, required this.status});

  @override
  Widget build(BuildContext context) {
    return Chip(
      label: Text(status, style: const TextStyle(fontSize: 10, color: Colors.white)),
      backgroundColor: status == 'OVERBOARD' ? Colors.red : Colors.green,
    );
  }
}
