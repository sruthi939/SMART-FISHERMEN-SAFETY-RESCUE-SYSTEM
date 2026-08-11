import 'package:flutter/material.dart';

class BoatMarkerWidget extends StatelessWidget {
  final String name;
  const BoatMarkerWidget({super.key, required this.name});

  @override
  Widget build(BuildContext context) {
    return const Icon(Icons.directions_boat, color: Colors.blue);
  }
}
