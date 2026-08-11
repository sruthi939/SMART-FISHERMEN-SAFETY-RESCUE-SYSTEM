import '../models/wearable.dart';

class WearableService {
  Future<Wearable> getWearableStatus(String wearableId) async {
    return Wearable(
      id: wearableId,
      macAddress: 'AA:BB:CC:11:22:33',
      batteryLevel: 94,
      waterImmersion: false,
      fallDetected: false,
      status: 'ACTIVE',
    );
  }
}
