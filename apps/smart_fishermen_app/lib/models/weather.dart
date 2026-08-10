class Weather {
  final String region;
  final double windSpeedKnots;
  final double waveHeightM;
  final double seaCurrentKnots;
  final String riskLevel;
  final String advisory;

  Weather({
    required this.region,
    required this.windSpeedKnots,
    required this.waveHeightM,
    required this.seaCurrentKnots,
    required this.riskLevel,
    required this.advisory,
  });

  factory Weather.fromJson(Map<String, dynamic> json) {
    final w = json['weather'] ?? json;
    return Weather(
      region: w['region'] ?? 'Arabian Sea South West',
      windSpeedKnots: (w['windSpeedKnots'] ?? 15.0).toDouble(),
      waveHeightM: (w['waveHeightM'] ?? 1.8).toDouble(),
      seaCurrentKnots: (w['seaCurrentKnots'] ?? 1.0).toDouble(),
      riskLevel: json['riskAnalysis']?['riskLevel'] ?? w['riskLevel'] ?? 'SAFE',
      advisory: json['riskAnalysis']?['advisory'] ?? w['advisory'] ?? 'Normal weather conditions.',
    );
  }
}
