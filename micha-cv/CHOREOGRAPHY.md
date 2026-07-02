# Choreographie — Micha Kadereit · From Backend Craft to AI Leadership

Template: the-journey (Man in a Hole)
Sektionen: status-quo, fall, struggle, turn, rise, new-normal
Sprache: Englisch · Ton: seriös, cinematisch, aufsteigend

Scroll-Modell: `window.__scrollProgress` läuft 0.0 → 1.0 über den Gesamtscroll.
Sechs gleich große Sektionen → Sektionsmitten bei ~0.08 / 0.25 / 0.42 / 0.58 / 0.75 / 0.92.

## Objekt-Register

| Cluster      | JS-Variablen                                   | Beschreibung |
|--------------|------------------------------------------------|--------------|
| particles    | `points`, `geo`, `positions`, `colors`, `COUNT`, `cool`, `warm`, `mat` | Partikel-Tunnel entlang −z; Farbe kühl→warm über die Tiefe |
| camera       | `camera`, `cameraY(p)`, `cameraZ(p)`, `DIP`, `RISE` | Reise durch den Tunnel, Abtauchen zur Mitte, Aufstieg ins Licht |
| atmosphere   | `MOOD[]`, `moodColor(p)`, `scene.background`, `scene.fog`, `body.is-light` | Stimmungsfarbe + Nebel + Hell/Dunkel-Flip (steuert A11y-Kontrast) |
| css-reveals  | `.reveal`, `.chapter-index`, `.stagger`, `.stat`, `data-count-to` | Text-Einblendungen, Kapitel-Ziffern, Count-ups im Finale |

## Sektions-Choreographie

| Sektion      | p (Mitte) | camera y / z            | atmosphere (bg-Hex, fog) | particles | css-reveals |
|--------------|-----------|-------------------------|--------------------------|-----------|-------------|
| #status-quo  | 0.08      | y≈0, z≈8 (Tunnelmund)   | #141a2e kühl, fog .026   | ruhig, kühl (blau) dominiert | Kapitel I + kicker + headline, Stagger 0/90/180ms |
| #fall        | 0.25      | y sinkt (~−3), z tiefer | #0a0c16 dunkler, fog dicht | Drift, Farbe kühlt weiter aus | Kapitel II, headline + lead, 0/120ms |
| #struggle    | 0.42      | y Tiefpunkt (~−6.8)     | #050507 fast schwarz, fog dichtest | dichter, dunkel, langsam | Kapitel III + `.quote` (Rolls-Royce-Moment), 0/160ms |
| #turn        | 0.58      | y kehrt (~−1), steigt   | #1a1526 erstes Violett   | erste Wärme mischt sich ein | Kapitel IV, headline + lead, 0/120ms |
| #rise        | 0.75      | y steigt (~+2.5)        | #3a2c3f wärmer           | warm (orange) nimmt zu, schneller | Kapitel V + accent-headline, 0/120ms |
| #new-normal  | 0.92      | y Hochpunkt (~+4.6)     | #f0e6d8 Creme, fog licht | warm, licht, aufgelöst → `is-light` flippt bei p>0.9 | Kapitel VI + `.grid-3.stagger` mit 3 count-ups, 0/110/220ms |

---

## Cluster: particles

| Sektion | Dichte/Verhalten | Farbmischung | Opazität |
|---|---|---|---|
| status-quo | ruhige Röhre, langsame Eigenrotation (`rotation.z = t*0.02`) | überwiegend `cool` #6ea8fe sichtbar (Kameranähe) | 0.9 |
| fall | gleiche Punkte, tiefer im Tunnel → dichter gestaffelt durch Fog | kühl, entsättigt durch dunklen Fog | 0.9 (Fog senkt effektive Helligkeit) |
| struggle | Tiefpunkt: Fog am dichtesten, nur nahe Punkte glimmen | kaum Farbe, fast monochrom dunkel | 0.9, visuell gedämpft |
| turn | Kamera dreht Blick nach oben → wärmere Tunnelabschnitte kommen ins Bild | Übergang `cool`→`warm` beginnt sichtbar | 0.9 |
| rise | schnelleres Vorbeiziehen (Kamera-Speed steigt mit z) | `warm` #ffb26e dominiert zunehmend | 0.9 |
| new-normal | lichtes Ende, additive Blending glüht auf Creme kaum → wirkt aufgelöst | warm, geht in hellen bg über | 0.9, aber niedriger Kontrast zum Creme-bg |

**Implementierungshinweise:** Partikelsystem des Templates unverändert lassen
(`COUNT`, Röhrenradius 9–18, `AdditiveBlending`, `sizeAttenuation`). Die
kühl→warm-Farbmischung entlang der Tiefe (`mix = i/COUNT`) trägt die
Vorher/Nachher-Metapher von selbst — der Aufstieg deckt die warmen Tiefen auf.
`reduceMotion` → COUNT 2500, keine Rotation. Kein Morph, keine Sektions-Bursts.

## Cluster: camera

| Sektion | y = RISE·p − DIP·sin(π·p) | z = 8 − p·(LENGTH−40) | Blickrichtung |
|---|---|---|---|
| status-quo (p≈.08) | ≈ 0.4 − 1.7 ≈ **−1.3** | ≈ 8 − 18 = −10 | leicht nach unten (p<.45 → lookY −2.5) |
| fall (p≈.25) | ≈ 1.25 − 5.0 ≈ **−3.7** | ≈ −47 | nach unten (Absacken) |
| struggle (p≈.42) | ≈ 2.1 − 6.9 ≈ **−4.8** (Nähe Tiefpunkt) | ≈ −84 | nach unten, Tiefpunkt bei p=.5 (y≈−4.5) |
| turn (p≈.58) | ≈ 2.9 − 6.9 ≈ **−4.0** (kehrt um) | ≈ −120 | Flip nach oben (p≥.45 → lookY +2.0) |
| rise (p≈.75) | ≈ 3.75 − 5.0 ≈ **−1.25** (steigt) | ≈ −157 | nach oben |
| new-normal (p≈.92) | ≈ 4.6 − 1.9 ≈ **+2.7** → p=1: **+5.0** | ≈ −195 | nach oben, ins Licht |

**Implementierungshinweise:** Kamerakurve des Templates beibehalten (DIP 7.0,
RISE 5.0). Der Sinus-Dip legt den Tiefpunkt exakt in die Mitte (`struggle`) — das
deckt sich mit dem inhaltlichen Wendepunkt. Der `lookY`-Flip von unten (Fall) auf
oben (ab Turn) bei p=0.45 verstärkt die Wende. Keine Änderung nötig; nur prüfen,
dass 6 Sektionen die Schwellen 0.45 (Blick-Flip) und 0.9 (is-light) sauber
zwischen `struggle→turn` bzw. innerhalb `new-normal` treffen — passt.

## Cluster: atmosphere

| Sektion | bg / fog-Hex | fog.density = 0.026 − 0.016·p | is-light |
|---|---|---|---|
| status-quo | #141a2e (kühl gedämpft) | ≈ 0.025 | false |
| fall | #0a0c16 (dunkler) | ≈ 0.022 | false |
| struggle | #050507 (fast schwarz) | ≈ 0.019 | false |
| turn | #1a1526 (erstes Violett) | ≈ 0.017 | false |
| rise | #3a2c3f (wärmer) | ≈ 0.014 | false |
| new-normal | #f0e6d8 (Creme) | ≈ 0.011 (lichtet auf) | **true bei p>0.9** |

**Implementierungshinweise:** `MOOD`-Keyframes des Templates unverändert
übernehmen — die dunkel→creme-Kurve trägt die emotionale Reise. Der
`body.is-light`-Flip bei p>0.9 ist verbindlich (kippt `--fg` auf #1c1509,
`--accent` auf burnt orange #9a4a12, `--scrim` auf hell) — NICHT entfernen, sonst
läuft helle Schrift auf Creme → WCAG-Fail. `--scrim`-Halo bleibt an jedem Text.

## Cluster: css-reveals

| Sektion | Elemente | Stagger (`--reveal-delay` / `--i`) | Count-up |
|---|---|---|---|
| status-quo | chapter-index, kicker, headline, lead | 0 / 90 / 180 / 270 ms | — |
| fall | chapter-index, kicker, subhead, lead | 0 / 120 ms (paarweise) | — |
| struggle | chapter-index, kicker, `.quote`, `.attribution` | 0 / 160 ms (Quote wirkt lassen) | — |
| turn | chapter-index, kicker, subhead, lead | 0 / 120 ms | — |
| rise | chapter-index, kicker, headline (accent), lead | 0 / 120 ms | — |
| new-normal | chapter-index, headline, `.grid-3` (3 stats), lead | grid `--i` 0 / 1 / 2 (Δ~110 ms) | `data-count-to`: 9 · 2 · 3 |

**Implementierungshinweise:** Reveal-System (`../shared/reveal.js`) triggert per
IntersectionObserver — keine JS-Änderung nötig, nur Klassen/Attribute im Markup.
Im Finale die drei `.stat` mit `data-count-to` versehen:
- `9` — Jahre Backend-Handwerk (2015→2024)
- `2` — AI-Hackathons geleitet (eigenes Team + anderes Team)
- `3` — AI-CLIs im Alltag gemeistert (Claude Code · Copilot · Devin)

Count-ups zählen automatisch hoch, sobald sichtbar. Quote in `struggle` bewusst
ohne parallele Reveals stehen lassen (Rolls-Royce-Moment braucht Ruhe).

---

## Konsistenz-Prüfung

- **Schwellen-Kollisionen:** Kein Konflikt. Der Blick-Flip (0.45) liegt sauber
  zwischen `struggle` (0.42) und `turn` (0.58); der `is-light`-Flip (0.9) liegt
  innerhalb `new-normal` (0.83–1.0), sodass Kamera-Hochpunkt, Creme-bg und
  Schrift-Kipp gemeinsam eintreten — ein einziger, klarer „Ankunft"-Moment.
- **Kontrast:** Kritische Stelle ist `new-normal` (Creme-bg). Der `is-light`-Flip
  + `--scrim`-Halo sichern AA. Warme Partikel (#ffb26e) auf Creme sind
  kontrastarm — akzeptabel, da rein dekorativ (`aria-hidden`) und Text durch
  Scrim geschützt. Nicht den Scrim entfernen.
- **Timing-Last:** Pro Sektion max. 4 gleichzeitige/gestaffelte Reveals — nicht
  überwältigend. Der Quote-Moment steht isoliert. Die 3 Count-ups im Finale
  laufen gestaffelt (nicht simultan) → ruhiger Abschluss.
- **Fazit:** Die Template-Motion (Kamera, Mood, Partikel) ist bereits stimmig auf
  den 6-Sektionen-Bogen ausgelegt und muss NICHT verändert werden. Die Arbeit in
  Schritt 3 ist rein inhaltlich (Texte EN) + die drei `data-count-to`-Werte.
