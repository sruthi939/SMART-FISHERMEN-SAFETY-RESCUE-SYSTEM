import 'package:flutter/material.dart';

class MapControlsWidget extends StatelessWidget {
  const MapControlsWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        IconButton(icon: const Icon(Icons.add), onPressed: () {}),
        IconButton(icon: const Icon(Icons.remove), onPressed: () {}),
      ],
    );
  }
}
