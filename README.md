# Mathe-Lernpfad: Produkt- & Kettenregel

Adaptiver Lernpfad für die 12NP (Berufskolleg). KI-gestütztes selbstständiges Lernen mit integriertem Gemini-Tutor.

## Features

- **Einstiegsdiagnose** → Adaptiver Pfad (Wiederholung bei Bedarf)
- **6 Einheiten:** Diagnose → Grundableitungen → Produktregel → Kettenregel → Strukturerkennung → Abschlusstest
- **Gestufte Hilfen:** Hinweise → Teilschritte → Lösungsweg (3 Versuche)
- **Fehlermuster-Erkennung:** Typische Fehler werden erkannt und gezielt kommentiert
- **KI-Tutor (Gemini 2.5 Flash):** Sokratische Methode, gibt nie die Lösung direkt
- **Mastery-Checks:** 80% Schwelle pro Einheit
- **Lehrer-Dashboard:** JSON-Import + Progress-Codes + CSV-Export

## Architektur

- **Frontend:** Vanilla JS + KaTeX (GitHub Pages)
- **Daten:** localStorage (pro Schüler)
- **KI:** Google Gemini 2.5 Flash (API, domain-restricted)
- **Tracking:** Progress-Codes + JSON-Export → Lehrer-Dashboard

## Nutzung

### Schüler
1. Öffne https://hbraak.github.io/mathe-lernpfad/
2. Gib deine Klassenlistennummer ein (1–25)
3. Arbeite den Lernpfad durch

### Lehrer
1. Öffne https://hbraak.github.io/mathe-lernpfad/dashboard.html
2. Importiere JSON-Dateien oder Progress-Codes der Schüler
3. Exportiere Ergebnisse als CSV

## Datenschutz

- Keine Klarnamen — nur Klassenlistennummern
- Daten bleiben im Browser (localStorage)
- Gemini API: Domain-restricted, kein Logging personenbezogener Daten
- PII-Warnung im Chat

## Lizenz

Schulinterner Gebrauch. Lore-Lorentz-Schule Düsseldorf.
