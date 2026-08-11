# Smart Fishermen Safety & Rescue System (SFSRS) - Unified Flutter App

A comprehensive cross-platform application (Android, iOS, Web) providing real-time boat tracking, wearable Man-Overboard (MOB) emergency alerts, AI weather risk prediction, and role-specific interfaces for:
- **Fisherman App:** Mayday SOS trigger, navigation map, ESP32 boat telemetry, crew wearable status.
- **Family App:** Live boat tracking radar, ETA return time, crew safety card, emergency notifications.
- **Rescue Control Center:** Multi-vessel map, distress queue, MOB beacon tracker, asset dispatch console.
- **Government Admin:** Vessel registry, license auditing, fuel subsidy DBT disbursement.

## Architecture
- `lib/core/`: Constants, Theme, Network (HTTP & Socket.IO), Storage, Permissions, Utils.
- `lib/models/`: Domain models for Users, Boats, Wearables, Emergencies, Weather, Risk Alerts.
- `lib/services/`: API and Socket integration services.
- `lib/widgets/`: Shared UI components for emergency buttons, gauges, maps, navigation.
- `lib/features/`: Feature modules for authentication, fisherman, family, rescue, admin.
- `lib/routes/`: Router & route definition guards.
