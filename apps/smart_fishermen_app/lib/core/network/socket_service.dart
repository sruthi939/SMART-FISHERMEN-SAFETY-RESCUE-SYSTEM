import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../constants/api_constants.dart';

class SocketService {
  late IO.Socket socket;
  bool isConnected = false;

  void connect({Function(dynamic)? onTelemetry, Function(dynamic)? onEmergency}) {
    socket = IO.io(
      ApiConstants.socketUrl,
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .build(),
    );

    socket.connect();

    socket.onConnect((_) {
      isConnected = true;
      print('Connected to Socket.IO Server');
    });

    socket.onDisconnect((_) {
      isConnected = false;
    });

    if (onTelemetry != null) {
      socket.on('boat:telemetry', onTelemetry);
    }
    if (onEmergency != null) {
      socket.on('emergency:sos', onEmergency);
      socket.on('wearable:mob', onEmergency);
    }
  }

  void disconnect() {
    socket.disconnect();
  }
}
