import '../core/network/api_client.dart';
import '../models/boat.dart';

class BoatService {
  final ApiClient _apiClient = ApiClient();

  Future<List<Boat>> getBoats() async {
    final response = await _apiClient.get('/boats');
    final list = response.data['boats'] as List;
    return list.map((b) => Boat.fromJson(b)).toList();
  }

  Future<Boat> getBoatDetails(String id) async {
    final response = await _apiClient.get('/boats/$id');
    return Boat.fromJson(response.data['boat']);
  }
}
