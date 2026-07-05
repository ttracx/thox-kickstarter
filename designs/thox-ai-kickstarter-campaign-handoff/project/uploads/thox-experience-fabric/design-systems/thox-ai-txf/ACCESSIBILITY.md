# Accessibility

WCAG 2.2 AA is the floor. THOX adds keyboard, voice, and dynamic scaling on top.

## Checklist

| Requirement | Rule |
|-------------|------|
| Color contrast | Body text >= 4.5:1, large text >= 3:1, non-text UI >= 3:1 |
| High contrast mode | Body text >= 7:1 |
| Keyboard | Every interactive element focusable and operable from keyboard |
| Focus indicator | 2 px emerald outline, 2 px offset, visible on every surface |
| Esc | Always closes the topmost overlay |
| Screen reader | Every component publishes a role and accessible name |
| Live regions | Status pill = polite; Warning+ notifications = assertive |
| Motion | prefers-reduced-motion disables transforms, shortens transitions to 0 ms |
| Touch targets | 44 x 44 px (phone/tablet), 40 x 40 px (watch) |
| Captions | All audio output synchronized; voice input transcribed |
| Locale | Advertised to OS; right-to-left layouts mirror navigation |

## Validators

The `accessibility-validator` crate runs the manifest-level check. Future versions add axe-core and Lighthouse integration. Failure blocks the release gate.

## Claim

`accessibilityCertified: true` in the TXF manifest is a binding claim. False claims block release.
