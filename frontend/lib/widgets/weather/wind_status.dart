import 'package:flutter/material.dart';

class WindStatus extends StatelessWidget {
  final double windSpeed;
  const WindStatus({super.key, required this.windSpeed});

  @override
  Widget build(BuildContext context) {
    return Text('Wind Speed: $windSpeed knots', style: const TextStyle(color: Colors.cyanAccent));
  }
}
