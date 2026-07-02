---
name: choreograph-presentation
description: >
  Plant alle dynamischen Objekte einer Präsentation (Three.js-Szene,
  Partikel, Kamera, Shader-Uniforms, CSS-Reveals, Count-ups) sektionsübergreifend
  und forkt dann parallele Agenten, die je einen Objekt-Cluster über alle
  Sektionen choreographieren. Liefert ein CHOREOGRAPHY.md als Blaupause für
  die konkrete Implementierung. Aufrufen bevor Three.js-Code geschrieben wird —
  idealerweise nach Schritt 2 (Template kopieren) in create-presentation.
models: [sonnet]
---

# choreograph-presentation

Du planst die Bewegungswelt einer fertigen Präsentation, bevor auch nur eine
Zeile Three.js-Code geschrieben wird. Ziel: ein vollständiges, widerspruchsfreies
Choreographie-Dokument erzeugen, indem parallele Agenten (Forks) je einen
Objekt-Cluster tief durchdenken — und du dann deren Ergebnisse zu einem
kohärenten Ganzen zusammenführst.

Arbeitsverzeichnis: `presentation-templates/`. Alle Pfade relativ dazu.

---

## Phase 1 — Inventar der dynamischen Objekte

Lies die Ziel-`index.html` (oder das Quell-Template, falls die Präsentation
noch nicht ausgefüllt ist). Identifiziere **jeden dynamischen Cluster** anhand
dieser Erkennungsmuster:

| Cluster-ID | Was suchen | Erkennungs-Signatur |
|---|---|---|
| `geometry` | Meshes, Geometrien, Morph-Targets | `THREE.BufferGeometry`, `THREE.Mesh`, `posAttr`, morph-Arrays (`scattered`, `sphere`, `tris`) |
| `particles` | Partikel-Systeme | `THREE.Points`, `Float32Array` für Positionen, `COUNT`, Spawn-Felder |
| `camera` | Kamera-Bewegung | `THREE.PerspectiveCamera`, `THREE.OrthographicCamera`, `camera.position`, `camera.lookAt` |
| `uniforms` | Shader-Uniforms & Materialien | `uniforms`, `uTime`, `uScroll`, `THREE.ShaderMaterial`, Farb-Lerps per `mat.color` |
| `css-reveals` | Text-Einblendungen | `.reveal`-Klassen, `--reveal-delay`, `data-count-to`-Elemente |

Für jeden gefundenen Cluster: notiere die **JS-Variablennamen**, die ihn
repräsentieren, und welche **Sektions-IDs** (`id="…"` an `<section>`) existieren.

Falls eine `index.html` noch nicht existiert (Template noch nicht kopiert):
Cluster-Typen aus der Template-Matrix in `create-presentation/SKILL.md` ableiten
und die Sektions-IDs aus dem gewählten Template-Typ übernehmen.

---

## Phase 2 — Leere Choreographie-Tabelle aufstellen

Schreibe eine Tabelle mit den gefundenen Sektions-IDs als Zeilen und den
Cluster-IDs als Spalten. Jede Zelle bleibt zunächst leer — sie wird von den
Fork-Agenten gefüllt:

```
| Sektion        | geometry | particles | camera | uniforms | css-reveals |
|----------------|----------|-----------|--------|----------|-------------|
| #<id-1>        |          |           |        |          |             |
| #<id-2>        |          |           |        |          |             |
| …              |          |           |        |          |             |
```

Nicht jede Präsentation hat alle Cluster. Spalten, für die kein Cluster
existiert, weglassen.

Schreibe diese Tabelle als Rohgerüst in `<slug>/CHOREOGRAPHY.md` (Datei anlegen):

```markdown
# Choreographie — <Präsentationstitel>

Template: <the-pitch | the-journey | the-reveal | the-signal>
Sektionen: <id-1>, <id-2>, …

## Objekt-Register

| Cluster      | JS-Variablen           | Beschreibung |
|--------------|------------------------|--------------|
| geometry     | mesh, geo, tris        | …            |
| particles    | points, scattered, …   | …            |
| camera       | camera                 | …            |
| uniforms     | gradientUniforms, mat  | …            |
| css-reveals  | .reveal, data-count-to | …            |

## Sektions-Choreographie

<!-- wird von Fork-Agenten ausgefüllt -->
| Sektion | geometry | particles | camera | uniforms | css-reveals |
|---------|----------|-----------|--------|----------|-------------|
…
```

---

## Phase 3 — Fork-Agenten starten

Forke **einen Agent pro Cluster** gleichzeitig. Jeder Fork erhält:

- Den vollen Inhalt der `index.html` (oder des Quell-Templates)
- Die Liste aller Sektions-IDs und deren inhaltliche Bedeutung (Überschrift,
  Stimmung, Story-Tactic)
- Seinen Cluster-Auftrag (unten definiert)
- Den Pfad zu `<slug>/CHOREOGRAPHY.md` (sein Ausgabedokument)
- Die Anweisung, **NUR** den ihm zugewiesenen Abschnitt in `CHOREOGRAPHY.md`
  zu befüllen (einen `## Cluster: <id>` Block), und nichts anderes zu ändern

### Prompt-Vorlage für jeden Fork

Passe den kursiven Teil je Cluster an:

```
Du bist Choreograph für den <CLUSTER-ID>-Cluster einer Three.js-Präsentation.

KONTEXT:
- Template-Typ: <the-pitch | the-journey | the-reveal | the-signal>
- Sektionen und ihre Stimmung:
  <#id-1: Stimmung/Tactic — ein Satz>
  <#id-2: Stimmung/Tactic — ein Satz>
  …
- Relevante JS-Objekte für deinen Cluster: <var1, var2, …>

AUFTRAG:
Definiere für jede Sektion den EXAKTEN Zustand aller Objekte deines Clusters.
Spezifiziere:
  - Ruhe-Zustand (Objekt steht, Sektion ist aktiv)
  - Transition-In (Scrolled in diese Sektion)
  - Transition-Out (Scrolled zur nächsten Sektion)
  - Konkrete Werte wo möglich: Position (x,y,z), Opacity, Farb-Hex, Zählwert, Delay-ms

CLUSTER-SPEZIFISCHE HINWEISE:
<geometry>: Welche Form nimmt das Mesh in jeder Sektion an? Morph-Targets,
  Burst-Verhalten (wie the-signal), Partikel-Form-Ziel (wie the-reveal sphere).
  Definiere via `window.__scrollProgress`-Schwellen (0.0–1.0 über Gesamtscroll).

<particles>: Spawn-Verhalten, Dichte (COUNT), Farb-Palette, Drift-Geschwindigkeit,
  Konvergenz-Ziel pro Sektion, Opazitäts-Kurve.

<camera>: Position (x,y,z) in Ruhe, Parallax-Stärke (Mouse-Faktor), FOV/Zoom,
  Push-In-Effekt beim Reveal. Nutze `window.__scrollProgress`-Schwellen.

<uniforms>: Werte für `uTime`-Multiplikator, `uScroll`-Einfluss, Farbübergänge
  (Hex-Werte mit Transition-Schwellen), Opazität der Shader-Ebene.

<css-reveals>: Stagger-Schema (`--reveal-delay` in ms) pro Sektion, ob Elemente
  gleichzeitig oder versetzt erscheinen, `data-count-to`-Zielwerte und
  `data-count-from`-Startwerte.

AUSGABE:
Schreibe deine Ergebnisse in `<slug>/CHOREOGRAPHY.md` unter dem Block:

## Cluster: <CLUSTER-ID>

Nutze eine Tabelle Sektion × Eigenschaft sowie einen Prosa-Abschnitt
"Implementierungshinweise" (was der Entwickler konkret coden muss).
Verändere keine anderen Teile der Datei.
```

### Parallelisierung

Alle Forks gleichzeitig starten (ein einziger `Agent`-Aufruf mit mehreren
Fork-Definitionen). Da jeder Fork nur seinen eigenen `## Cluster:`-Block
schreibt, gibt es keine Schreibkonflikte.

---

## Phase 4 — Zusammenführen und prüfen

Nachdem alle Forks abgeschlossen sind:

1. Lies `<slug>/CHOREOGRAPHY.md` vollständig
2. Prüfe Konsistenz zwischen den Clustern:
   - Stimmen die Sektions-Schwellen überein? (Ein Partikel-Konvergenz bei 0.7
     darf nicht kollidieren mit einem Kamera-Push bei 0.65)
   - Gibt es visuelle Widersprüche? (Helle Partikel über hellem Uniform →
     Kontrast-Problem)
   - Sind die Timing-Werte realistisch? (Zu viele gleichzeitige Transitions
     überwältigen den Betrachter)
3. Schreibe eine kurze `## Konsistenz-Prüfung`-Sektion am Ende von
   `CHOREOGRAPHY.md` mit gefundenen Spannungen und Lösungsvorschlägen
4. Melde dem Nutzer: `CHOREOGRAPHY.md` ist fertig unter `<slug>/CHOREOGRAPHY.md`

---

## Übergabe an die Implementierung

Das fertige `CHOREOGRAPHY.md` ist die Blaupause für Phase 3 in
`create-presentation` (Sektionen füllen + Three.js-Code schreiben). Der
implementierende Agent liest `CHOREOGRAPHY.md` **zuerst**, bevor er eine
einzige Zeile Three.js schreibt.

Nach Abschluss der Präsentation kann `CHOREOGRAPHY.md` im Ordner verbleiben
(Dokumentation) oder gelöscht werden — es ist kein Teil der Präsentation.
