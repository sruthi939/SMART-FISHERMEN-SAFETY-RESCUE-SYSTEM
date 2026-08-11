import 'dart:convert';
import 'package:http/http.dart' as http;
import '../constants/api_constants.dart';
import 'api_exception.dart';
import 'api_response.dart';

class ApiClient {
  final http.Client _client = http.Client();

  Future<ApiResponse> get(String endpoint) async {
    try {
      final response = await _client.get(
        Uri.parse('${ApiConstants.baseUrl}$endpoint'),
        headers: {'Content-Type': 'application/json'},
      );
      return _processResponse(response);
    } catch (e) {
      throw ApiException('Network error: $e');
    }
  }

  Future<ApiResponse> post(String endpoint, Map<String, dynamic> body) async {
    try {
      final response = await _client.post(
        Uri.parse('${ApiConstants.baseUrl}$endpoint'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(body),
      );
      return _processResponse(response);
    } catch (e) {
      throw ApiException('Network error: $e');
    }
  }

  ApiResponse _processResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final data = jsonDecode(response.body);
      return ApiResponse(statusCode: response.statusCode, data: data);
    } else {
      throw ApiException('HTTP Error ${response.statusCode}: ${response.body}');
    }
  }
}
