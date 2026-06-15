# Miqāt Registration System (RMS)

A React Native (Expo) mobile app implementing the **Miqāt Registration** design
from Figma. This build covers the core registration happy path.

## Core flow

`Login → Miqaat List → Registration Detail → Add People → Review & Submit`

| Screen | What it does |
| --- | --- |
| **Login** | Gold-on-green hero, ITS ID / password inputs, Remember Me, Login. |
| **Miqaat List** | Gradient app bar + event cards with live/upcoming states and countdown tiles. |
| **Registration Detail** | Hero, official Fasal announcement (with Arabic salawat), host city + relay centers, important notices, intro video, sticky "Register Now". |
| **Add People** | Family list with selection, guardian/caregiver assignment bottom sheet, ITS search, sticky confirm. |
| **Review & Submit** | Participant counts, grouped guardian/caregiver pairs, invited mehmaan, final submit. |

## Tech

- **Expo SDK 56** + React Native 0.85, TypeScript
- **React Navigation** (native stack)
- **expo-linear-gradient** for the green/gold gradients
- **react-native-svg** for the golden lantern emblem and hero glow
- **@expo/vector-icons** for UI iconography
- Fonts: **Marcellus** (serif display), **Mulish** (body), **Amiri** (Arabic)

## Design tokens

Colors, typography, and spacing pulled from the Figma file live in
[`src/theme`](src/theme). Mock content for the flow is in
[`src/data/mock.ts`](src/data/mock.ts).

## Running

```bash
npm install
npm run ios      # or: npm run android
```

> **Note on assets:** the original Figma raster assets (logo, hero photography,
> decorative mosque silhouettes) are not bundled — they live behind Figma's CDN
> which is outside this environment's network policy. They are reproduced with
> gradients, an SVG lantern emblem, and vector icons, which closely match the
> design since the heroes are overlaid with green gradients anyway. Drop the real
> assets into `assets/` and swap them in when available.
