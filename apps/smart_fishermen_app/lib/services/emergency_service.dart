import '../core/network/api_client.dart';
import '../models/emergency.dart';

class EmergencyService {
  final ApiClient _apiClient = ApiClient();

  Future<Emergency> triggerSOS(String boatId, double lat, double lon, String description) async {
    final response = await _apiClient.post('/emergency/sos', {
      'boatId': boatId,
      'latitude': lat,
      'longitude': lon,
      'description': description,
    });
    return Emergency.fromJson(response.data['emergency']);
  }

  Future<Emergency> triggerMOB(String wearableId, String boatId, double lat, double lon) async {
    final response = await _apiClient.post('/emergency/mob', {
      'wearableId': wearableId,
      'boatId': boatId,
      'latitude': lat,
      'longitude': lon,
    });
    return Emergency.fromJson(response.data['emergency']);
  }

  Future<List<Emergency>> getEmergencies() async {
    final response = await _apiClient.get('/emergency');
    final list = response.data['emergencies'] as List;
    return list.map((e) => Emergency.fromJson(e)).toList();
  }
}
