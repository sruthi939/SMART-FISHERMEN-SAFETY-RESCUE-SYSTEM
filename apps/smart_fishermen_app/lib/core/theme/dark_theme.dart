import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';

final ThemeData darkThemeData = ThemeData(
  brightness: Brightness.dark,
  primaryColor: AppColors.primary,
  scaffoldBackgroundColor: AppColors.darkBackground,
  cardColor: AppColors.darkCard,
  colorScheme: const ColorScheme.dark(
    primary: AppColors.primary,
    secondary: AppColors.accent,
    surface: AppColors.darkSurface,
    background: AppColors.darkBackground,
    error: AppColors.sosRed,
  ),
  textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
    bodyLarge: const TextStyle(color: AppColors.textPrimary),
    bodyMedium: const TextStyle(color: AppColors.textSecondary),
  ),
  useMaterial3: true,
);
