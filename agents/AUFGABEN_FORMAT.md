# Aufgabenformat — Referenz

## YAML-Struktur pro Unit

```yaml
unit:
  id: steckbrief                    # Eindeutiger Schlüssel
  title: "Steckbriefaufgaben"       # Anzeigename
  description: |                    # Kurzbeschreibung für SuS
    Funktionen aus Bedingungen rekonstruieren —
    vom Sachproblem zum mathematischen Modell.
  explanation: |                    # Optional: HTML-Erklärungsblock (wird vor den Aufgaben gezeigt)
    <h3>Vorgehen bei Steckbriefaufgaben</h3>
    <ol>
      <li>Funktionstyp wählen (Grad → Anzahl Koeffizienten)</li>
      <li>Bedingungen in Gleichungen übersetzen</li>
      <li>LGS lösen (Gauß oder CAS)</li>
      <li>Ergebnis validieren</li>
    </ol>
  lernpfad: 2                       # LP1 oder LP2
  bildungsplan:
    as: 6                           # Anforderungssituation
    ziele: [Z1, Z2]                 # Welche Ziele abgedeckt
  masteryThreshold: 0.7             # 70% zum Bestehen
  order: 8                          # Position im Gesamtpfad

tasks:
  - id: sb1
    type: freitext
    difficulty: leicht              # leicht / mittel / schwer
    question: |
      **Werkstückprofil**

      Ein Werkstück hat ein Querschnittsprofil, das durch eine
      quadratische Funktion $f(x) = ax^2 + bx + c$ beschrieben wird.

      Aus der technischen Zeichnung liest du ab:
      - Am linken Rand ($x = 0$) ist die Höhe $2\,\text{cm}$
      - Am rechten Rand ($x = 4$) ist die Höhe $10\,\text{cm}$
      - Am rechten Rand läuft das Profil waagerecht aus: $f'(4) = 0$

      **Berechne die Koeffizienten $a$, $b$ und $c$.**
      Gib dein Ergebnis als `a; b; c` an.
    answer: "-1/2; 4; 2"
    accepts:
      - "-1/2; 4; 2"
      - "-0.5; 4; 2"
      - "-0,5; 4; 2"
      - "a=-1/2, b=4, c=2"
    hints:
      - |
        Übersetze die drei Bedingungen in Gleichungen:
        - $f(0) = c = 2$
        - $f(4) = 16a + 4b + 2 = 10$, also $16a + 4b = 8$
        - $f'(4) = 8a + b = 0$
      - |
        Aus $8a + b = 0$ folgt $b = -8a$.
        Einsetzen in $16a + 4(-8a) = 8$:
        $16a - 32a = 8$, also $-16a = 8$.
      - |
        $a = -\frac{1}{2}$, $b = -8 \cdot (-\frac{1}{2}) = 4$, $c = 2$.
    errorPatterns:
      "1/2; 4; 2": "Vorzeichen! $-16a = 8$ ergibt $a = -\\frac{1}{2}$, nicht $+\\frac{1}{2}$."
      "-1/2; -4; 2": "$b = -8a = -8 \\cdot (-\\frac{1}{2}) = +4$, nicht $-4$."

  - id: sb2
    type: choice
    difficulty: leicht
    question: |
      **Knickfreier Übergang**

      Zwei Kurvenstücke sollen an der Stelle $x = 3$ knickfrei
      aneinander anschließen.

      Was muss dafür gelten?
    options:
      - "Nur die Funktionswerte müssen übereinstimmen: $f_1(3) = f_2(3)$"
      - "Funktionswerte UND Ableitungen müssen übereinstimmen: $f_1(3) = f_2(3)$ und $f_1'(3) = f_2'(3)$"
      - "Nur die Ableitungen müssen übereinstimmen"
      - "Die zweiten Ableitungen müssen übereinstimmen"
    correct: 1
    hints:
      - |
        „Knickfrei" bedeutet: kein Knick im Graphen.
        Ein Knick entsteht, wenn die Steigung springt.
        Also müssen **Funktionswert und Steigung** an der Nahtstelle gleich sein.
```

## Aufgabentypen

### Freitext
- `answer`: Die Musterlösung (wird als korrekt angezeigt)
- `accepts`: Liste aller akzeptierten Eingaben (exakter Stringvergleich)
- `errorPatterns`: Dict von falsche_eingabe → hilfreiche Rückmeldung

### Multiple Choice
- `options`: Liste der Antwortmöglichkeiten (0-indiziert)
- `correct`: Index der richtigen Antwort

## Qualitätskriterien

1. **Aufgabentext ≥ 3 Sätze** (Kontext + Auftrag)
2. **Arbeitsauftrag fett** und als Imperativ ("Berechne...", "Begründe...")
3. **Einheiten immer angeben** bei physikalischen Größen
4. **Mindestens 2 Hints** pro Aufgabe (gestaffelt: Tipp → Teilschritt → Lösung)
5. **Mindestens 1 Error-Pattern** bei Freitext-Aufgaben
6. **Antwortformat klar angeben** ("Gib ... als `a; b` an")
7. **Keine Abkürzungen** die SuS nicht kennen (außer Standard: cm, kg, V, Ω)
