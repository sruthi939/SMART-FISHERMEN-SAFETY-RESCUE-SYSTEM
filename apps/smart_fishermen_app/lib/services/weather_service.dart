import '../core/network/api_client.dart';
import '../models/weather.dart';

class WeatherService {
  final ApiClient _apiClient = ApiClient();

  Future<Weather> getWeatherForecast() async {
    final response = await _apiClient.get('/weather');
    return Weather.fromJson(response.data);
  }
}
