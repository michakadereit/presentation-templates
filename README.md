# Presentation Templates

Vier beeindruckende, präsentationsfertige HTML-Templates. Jedes verbindet eine
**Storyteller-Tactics-Struktur** (Pip Decks) mit einer eigenen **three.js-Visualwelt**.
Statisch, kein Build — per Doppelklick über `file://` lauffähig.

## Die Templates

| Ordner | Story-Struktur (Storyteller Tactics) | Visualwelt | Zweck |
|--------|--------------------------------------|------------|-------|
| [`the-pitch/`](the-pitch/) | **Hero & Guide** + **Story Hooks** + **What's It About?** | Hell/luftig, kinetischer Gradient + Partikelfeld | Idee/Produkt pitchen |
| [`the-journey/`](the-journey/) | **Man in a Hole** + **Rolls Royce Moment** | Cinematisch, Scroll-Tunnel dunkel→hell | Transformation / Case Study |
| [`the-reveal/`](the-reveal/) | **Data Detective** + **Three is the Magic Number** + **Secrets & Puzzles** | Bold/dunkel, Partikel-Morph + große Zahlen | Datengetriebene Pointe |
| [`the-signal/`](the-signal/) | **Story Hooks** + **What's It About?** + **Show & Tell** (×3) + **Full Circle** | Dreieck-Mosaik (CGM-Palette): Leinwand löst sich am Übergang auf & fügt sich neu | Konzept „aus Teilen wird ein Ganzes" |

### Warum diese Auswahl?
Maximaler Kontrast in **Struktur** *und* **Optik**:
- **Pitch** — überzeugen (Publikum = Held, Sprecher = Guide). Aspirational, clean.
- **Journey** — mitnehmen (emotionaler Fall-und-Aufstieg-Arc). Cinematisch, immersiv.
- **Reveal** — verblüffen (Spannungsaufbau → Aha-Moment mit Daten). Editorial, hochkontrast.
- **Signal** — *experimentell*: das Visual **ist** die Botschaft. Eine Leinwand aus
  Dreiecken (Navy/Gold/Cyan) zerfällt beim Scroll-Übergang nach einer festen Regel
  (radialer Burst + farb-abhängiger Bias + Eigenrotation) und findet in jeder Sektion
  wieder zusammen — „aus Rauschen wird ein Bild". Basiert auf der Geometrie des
  CGM-„Videosprechstunde"-Icons (drei Dreiecke = Play/Screen).

## Storyteller Tactics — Kurzreferenz

Pip Decks *Storyteller Tactics* = 54 Frameworks in 7 Kategorien (Concept, Explore,
Character, Function, Structure, Style, Organise). Die genutzten Kernkarten:

- **Story Hooks** — packender Einstieg, der sofort Neugier erzeugt.
- **Hero & Guide** — das Publikum ist der Held, der Sprecher der Mentor mit dem Plan.
- **What's It About?** — eine einzige klare Kernbotschaft.
- **Man in a Hole** — Status quo → Fall ins Problem → Kampf → Wende → Aufstieg → neue Normalität.
- **Rolls Royce Moment** — ein konkretes, sinnliches Detail, das haften bleibt.
- **Data Detective** — Fakten in eine Erzählung wickeln, damit Zahlen erinnert werden.
- **Three is the Magic Number** — Dreierstruktur fürs Gedächtnis.
- **Secrets & Puzzles** — eine Enthüllung versprechen, damit die Story im Kopf bleibt.
- **Show & Tell** — Visual und Erzählung synchron führen.

## Technische Konventionen (für alle Templates verbindlich)

**Ziel: Doppelklick auf `index.html` funktioniert über `file://` ohne Server.**

1. **three.js-Szene inline** als `<script type="module">` direkt in `index.html`.
   Import **nur von absoluter HTTPS-URL**:
   ```html
   <script type="module">
     import * as THREE from "https://esm.sh/three@0.169.0";
     // ... Szene ...
   </script>
   ```
   > ⚠️ Kein Import lokaler Modul-Dateien (`./scene.js`) — Chrome blockt
   > Modul-Fetches über `file://` per CORS. Absolute HTTPS-Imports gehen.
2. **Shared-Assets** werden verlinkt (kein Modul, daher `file://`-sicher):
   ```html
   <link rel="stylesheet" href="../shared/base.css" />
   <script defer src="../shared/reveal.js"></script>
   ```
3. **Palette überschreiben** in einem `<style>` im `<head>` via `:root { --bg / --fg / --accent … }`.
4. **Canvas** liegt fest hinter dem Inhalt: `<canvas class="scene-canvas">`.
5. **Scroll koppeln**: `shared/reveal.js` setzt `window.__scrollProgress` (0..1).
   Die Szene liest diesen Wert pro Frame, um Kamera/Farbe/Partikel zu steuern.
6. **Performance**: `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`,
   `renderer` bei Resize aktualisieren, `prefers-reduced-motion` respektieren.
7. **Barrierefreiheit**: semantisches HTML, ausreichend Kontrast, Inhalt lesbar
   auch ohne WebGL (Canvas ist rein dekorativ).

## Shared-Bausteine

- `shared/base.css` — Design-Tokens, Reset, fluide Typo-Skala, `.section`-Layout,
  `.reveal`-Utilities, `.progress`-Bar, `.nav-dots`, `.kicker/.headline/.lead`.
- `shared/reveal.js` — IntersectionObserver-Reveal, aktive Nav-Dots, Progress-Bar,
  `window.__scrollProgress`.

## Nutzung

Ordner öffnen, `index.html` doppelklicken. Inhalte in den `.section`-Blöcken
ersetzen, Palette im `<head>`-`<style>` anpassen. Fertig zum Präsentieren.

## Skill: Präsentation erstellen

Der Skill [`create-presentation`](.claude/skills/create-presentation/SKILL.md)
wählt kontextabhängig das passende Template, kopiert es als Geschwister-Ordner
und füllt die Sektionen entlang der Story-Struktur — unter Wahrung der A11y-
und `file://`-Konventionen. Aufruf z.B. über „erstelle eine Präsentation /
einen Pitch / eine Story-Seite".

## Quellen
- Pip Decks — Storyteller Tactics: https://pipdecks.com/pages/storyteller-tactics
- three.js Dokumentation: https://threejs.org/docs/
