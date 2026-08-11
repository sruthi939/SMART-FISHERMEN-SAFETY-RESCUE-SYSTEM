import '../core/network/api_client.dart';

class TrackingService {
  final ApiClient _apiClient = ApiClient();

  Future<void> sendTelemetry(String boatId, double lat, double lon, double speed) async {
    await _apiClient.post('/tracking/telemetry', {
      'boatId': boatId,
      'latitude': lat,
      'longitude': lon,
      'speedKnots': speed,
    });
  }
}
