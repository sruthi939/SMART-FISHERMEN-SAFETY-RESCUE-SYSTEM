import 'package:flutter/material.dart';

class WeatherWarning extends StatelessWidget {
  final String warning;
  const WeatherWarning({super.key, required this.warning});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      color: Colors.amber.shade900,
      child: Text(warning, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
    );
  }
}
