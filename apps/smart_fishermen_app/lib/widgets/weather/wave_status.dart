import 'package:flutter/material.dart';

class WaveStatus extends StatelessWidget {
  final double waveHeight;
  const WaveStatus({super.key, required this.waveHeight});

  @override
  Widget build(BuildContext context) {
    return Text('Wave Height: $waveHeight m', style: const TextStyle(color: Colors.blueAccent));
  }
}
