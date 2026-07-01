---
name: create-presentation
description: >
  Erzeugt aus einem der drei Story-Templates (the-pitch / the-journey /
  the-reveal) eine fertige, präsentationsreife HTML-Seite. Wählt
  kontextabhängig die passende Story-Struktur (Pip Decks Storyteller
  Tactics) und three.js-Visualwelt, kopiert das Template als
  Geschwister-Ordner, füllt die Sektionen mit dem Inhalt des Nutzers und
  wahrt dabei die A11y- (WCAG AA) und file://-Konventionen. Nutzen, wenn
  jemand "erstelle eine Präsentation / einen Pitch / eine Story-Seite / ein
  Deck / eine Landing-Story" sagt oder eine Botschaft visuell vermitteln will.
models: [sonnet]
---

# create-presentation

Du baust aus einem der drei vorhandenen Story-Templates eine fertige
Präsentations-Seite. Kern der Aufgabe: die **richtige Story-Struktur** für
das Ziel des Nutzers wählen, das Template kopieren und die Sektionen mit
echtem Inhalt füllen — ohne die Technik- und Barrierefreiheits-Leitplanken
zu brechen.

Arbeitsverzeichnis ist der Submodul-Root `presentation-templates/`. Alle
Pfade unten sind relativ dazu.

## 1 · Ziel klären und Template wählen

Zuerst verstehen, **was** vermittelt werden soll und **welche Wirkung** es
haben muss. Wenn das aus dem Kontext nicht eindeutig ist, kurz nachfragen
(nicht raten). Dann anhand dieser Matrix das Template wählen:

| Wenn das Ziel ist … | Signalwörter | Template | Story-Struktur (Tactics) | Visualwelt |
|---|---|---|---|---|
| **überzeugen / gewinnen** — eine Idee, ein Produkt, ein Vorschlag pitchen | „pitch", „verkaufen", „vorstellen", „überzeugen", „investor", „proposal" | `the-pitch` | Hero & Guide + Story Hooks + What's It About? | hell/luftig, kinetischer Gradient + Partikel |
| **mitnehmen / bewegen** — eine Transformation, Case Study, Vorher/Nachher, persönliche Reise | „journey", „case study", „transformation", „vorher/nachher", „wie wir … geschafft haben" | `the-journey` | Man in a Hole + Rolls Royce Moment | cinematisch, Scroll-Kamerafahrt dunkel→hell |
| **verblüffen / beweisen** — datengetrieben mit Pointe, Zahlen, Aha-Moment | „daten", „zahlen", „studie", „ergebnis", „insight", „reveal", „metrics" | `the-reveal` | Data Detective + Three is the Magic Number + Secrets & Puzzles | bold/dunkel, Partikel-Morph + Count-up-Zahlen |

Grenzfälle: geht es primär um **Emotion/Erzählung** → the-journey; um **eine
harte Kennzahl als Pointe** → the-reveal; um **eine Entscheidung/Handlung
des Publikums** → the-pitch. Im Zweifel dem Nutzer die zwei plausibelsten
Optionen mit einem Satz Begründung anbieten.

## 2 · Template kopieren

Neue Präsentation als **Geschwister-Ordner** innerhalb von
`presentation-templates/` anlegen — nur so lösen die `../shared/`-Links und
`file://` weiter auf:

```bash
cp -R the-<typ> <slug>        # z.B. cp -R the-pitch q3-board-pitch
```

`<slug>` = kurz, kebab-case, sprechend (Thema/Anlass). Nicht in ein anderes
Verzeichnis kopieren, außer der Nutzer verlangt es ausdrücklich → dann auch
`shared/` mitkopieren und in der `index.html` alle `../shared/` durch
`./shared/` ersetzen.

## 3 · Sektionen füllen

Die Sektions-Struktur **beibehalten** (IDs, Nav-Dots, Reihenfolge) und den
Platzhalter-Inhalt durch echten ersetzen. Jede Sektion trägt im HTML einen
Kommentar mit der greifenden Storyteller-Tactic — daran orientieren. Pro
Template:

**the-pitch** (`#hook → #stakes → #guide → #plan → #about`)
1. `hook` — **Story Hooks**: eine provokante Einzeiler-Frage/Aussage, die
   sofort Neugier weckt. Kurzer Untertitel mit dem Einsatz.
2. `stakes` — **Hero & Guide (das Problem des Helden)**: den emotionalen
   Preis benennen, den das Publikum schon spürt.
3. `guide` — **Hero & Guide (Empathie + Autorität)**: warum du/ihr der
   vertrauenswürdige Mentor seid (Beleg, Track Record).
4. `plan` — **Three is the Magic Number**: genau 3 Schritte in den Karten.
5. `about` — **What's It About?**: eine einzige klare Kernbotschaft + CTA.

**the-journey** (`#status-quo → #fall → #struggle → #turn → #rise → #new-normal`)
1. `status-quo` — ruhiger Ausgangszustand, der nach Veränderung ruft.
2. `fall` — der Absturz ins Problem (Stimmung kippt).
3. `struggle` — tiefster Punkt. Hier gehört ein **Rolls Royce Moment**: ein
   konkretes, sinnliches Detail/Zitat, das haften bleibt (im `.quote`-Block).
4. `turn` — die Wende / Einsicht / Entscheidung.
5. `rise` — das Herausklettern.
6. `new-normal` — neue Normalität + Ausblick. Am hellen Ende darf Text auf
   Creme laufen — der dynamische `is-light`-Flip regelt den Kontrast (nicht
   entfernen).

**the-reveal** (`#setup → #clue-1 → #clue-2 → #clue-3 → #reveal → #sowhat`)
1. `setup` — **Secrets & Puzzles**: eine Frage/ein Rätsel, verspricht eine
   Enthüllung.
2. `clue-1/2/3` — **Data Detective** + **Three is the Magic Number**: drei
   Fakten, je eine große Zahl. Zahl über `data-count-to` steuern (optional
   `data-count-from`, `data-decimals`, `data-suffix` — zählt hoch/runter,
   sobald sichtbar).
3. `reveal` — der Aha-Moment: die entscheidende Zahl, dramatisch inszeniert
   (Partikel formieren sich). Kurzer Label-Text + ein Satz Erklärung.
4. `sowhat` — die Implikation / der Call-to-Action.

Kürzen ist erlaubt: nicht benötigte Sektionen entfernen (dann auch den
zugehörigen Nav-Dot in `<nav class="nav-dots">` löschen, damit die Punkte
zur Sektionszahl passen). Neue Sektionen im selben Muster (`.section[id]` +
`.section__inner` + `.reveal`) ergänzen.

Titel in `<title>` und den Kicker/Marken-Namen anpassen.

## 4 · Palette und Feinschliff

Die Farben im `<head>`-`<style>` über `:root { --bg / --fg / --muted /
--accent / --accent-2 }` anpassen. **`--scrim` immer beibehalten** (der
Lesbarkeits-Halo) — nur den Farbton mitziehen, wenn die Palette kippt
(hell → helles Scrim, dunkel → dunkles Scrim).

## 5 · Technische Leitplanken (verbindlich)

Diese Regeln **nicht** brechen — sie machen die Templates teilbar und
barrierefrei (Details in `README.md`):

1. **three.js inline** als `<script type="module">`, Import nur von
   absoluter HTTPS-URL (`https://esm.sh/three@0.169.0`). Keine lokalen
   Modul-Imports (Chrome blockt sie über `file://`).
2. Shared-Assets bleiben verlinkt: `../shared/base.css` +
   `../shared/reveal.js`.
3. **WCAG AA**: aller Text ≥ 4.5:1 (normal) bzw. ≥ 3.0:1 (groß, ≥24px oder
   ≥18.7px bold) gegen den realistischen Hintergrund. Der `--scrim`-Halo
   sichert das ab; bei sehr hellen Akzenten/Partikeln die Textfarbe prüfen,
   nicht den Scrim wegnehmen.
4. **`prefers-reduced-motion`** respektieren (statische/ruhige Szene).
5. Muss per **Doppelklick über `file://`** laufen — keine Server-Abhängigkeit.

## 6 · Verifizieren

Wenn möglich vor der Übergabe kurz prüfen:

```bash
python3 -m http.server 8099   # dann http://localhost:8099/<slug>/ öffnen
```

Sinnvolle Checks: rendert der Canvas, sind alle Sektionen/Nav-Dots da,
zählen die Zahlen (reveal), und hält der Kontrast an den kritischen Stellen
(heller/bunter Hintergrund hinter Text). Bei Playwright-Verfügbarkeit die
kritischen Sektionen screenshoten und die Kontrast-Ratios rechnerisch
gegenprüfen (siehe die WCAG-Luminanz-Formel). Danach den Server stoppen und
temporäre Screenshots entfernen.

## Ergebnis

Am Ende dem Nutzer melden: welches Template warum gewählt wurde, wo die
Datei liegt (`presentation-templates/<slug>/index.html`), und wie sie zu
öffnen ist (Doppelklick). Kurz auf die noch austauschbaren Stellen
hinweisen (Kernbotschaft, CTA, Zahlen).
