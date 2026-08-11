import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';

final ThemeData lightThemeData = ThemeData(
  brightness: Brightness.light,
  primaryColor: AppColors.primary,
  scaffoldBackgroundColor: const Color(0xFFF1F5F9),
  cardColor: Colors.white,
  colorScheme: const ColorScheme.light(
    primary: AppColors.primary,
    secondary: AppColors.accent,
    surface: Colors.white,
    background: Color(0xFFF1F5F9),
    error: AppColors.sosRed,
  ),
  textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme),
  useMaterial3: true,
);
