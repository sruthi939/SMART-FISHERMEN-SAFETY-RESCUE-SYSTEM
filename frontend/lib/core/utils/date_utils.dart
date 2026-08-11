import 'package:intl/intl.dart';

class AppDateUtils {
  static String formatTimestamp(DateTime dateTime) {
    return DateFormat('hh:mm a, dd MMM yyyy').format(dateTime);
  }

  static String formatTimeOnly(DateTime dateTime) {
    return DateFormat('hh:mm a').format(dateTime);
  }
}
