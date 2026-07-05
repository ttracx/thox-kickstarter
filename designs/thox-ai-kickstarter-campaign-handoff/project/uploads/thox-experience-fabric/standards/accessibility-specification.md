# THOX Accessibility Specification

Version: 2.0  |  Status: Normative  |  Owner: TXF  |  Baseline: WCAG 2.2 AA

## 1. Contrast

Body text: >= 4.5:1 against background. Large text (>= 18 pt or 14 pt bold): >= 3:1. Non-text UI components: >= 3:1. High-contrast mode MUST raise body text to >= 7:1.

## 2. Keyboard

Every interactive element MUST be reachable with Tab. Focus order MUST follow visual order. Focus indicator MUST be visible (emerald ring, 2 px outline, 2 px offset). No keyboard trap MAY exist; Esc MUST always close the topmost overlay.

## 3. Screen Reader

Every TXF component MUST publish a semantic role and accessible name. Status pills MUST announce state transitions via `aria-live="polite"`. Notifications MUST announce via `aria-live="assertive"` when severity is Warning or higher. Voice transcripts MUST be exposed as captions.

## 4. Motion

`prefers-reduced-motion: reduce` MUST disable transform animations, parallax, and auto-playing video. Opacity transitions MAY remain. Maximum duration under reduced motion: 100 ms.

## 5. Touch Targets

44 x 44 px minimum on phone and tablet. 40 x 40 px minimum on watch. Targets within 8 px of each other are treated as one target for hit-testing.

## 6. Captions and Transcripts

All audio output (voice, alerts) MUST have a synchronized caption. All voice input that drives state changes MUST have a visible transcript.

## 7. Language

Locale MUST be advertised to the OS so screen readers pick the correct voice. Right-to-left layouts MUST flip the navigation and inline-end alignments.

## 8. Compliance

`accessibilityCertified: true` in the TXF manifest is a binding claim that all of the above were validated for the shipping build. False claims block the release gate.
