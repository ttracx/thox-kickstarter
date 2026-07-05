# THOX Interaction Specification

Version: 2.0  |  Status: Normative  |  Owner: TXF

## 1. Input Modalities

Every TXF surface MUST accept at minimum: pointer, keyboard, voice. Surfaces SHOULD accept touch, gesture, gaze, and pen where the hardware supports it.

## 2. Keyboard

| Action | Shortcut |
|--------|----------|
| Command palette | Cmd+K / Ctrl+K |
| Toggle navigation | Cmd+\\ / Ctrl+\\ |
| Switch project | Cmd+P / Ctrl+P |
| Switch device | Cmd+Shift+D / Ctrl+Shift+D |
| Open vault | Cmd+Shift+V / Ctrl+Shift+V |
| THOXY focus | Cmd+J / Ctrl+J |

All interactive elements MUST be focusable and operable from the keyboard. Focus rings MUST use the emerald accent at 2 px outline with 2 px offset.

## 3. Voice

Wake: `THOXY`. State ladder: `idle -> listening -> thinking -> responding | executing -> completed | error -> idle`. Surfaces MUST visualize the current state with the THOXY ring component.

## 4. Haptics

Available on devices that support it. Mapping: confirm (light tap), warning (double tap), error (sharp). Haptics MUST be disable-able from Preferences.

## 5. Pointer

Hover MUST be additive only. Click affordances MUST be visible without hover (mobile parity). Right-click MUST mirror at least the first three commands available on long-press.

## 6. Drag and Drop

Allowed in: Projects (file/folder), Devices (panel reorder), Workflows (step reorder), Vault (move into archive). Drag MUST display the drop target in emerald with reduced opacity.

## 7. Confirmation

Destructive actions MUST require explicit confirmation. The confirm button MUST use the danger variant. Time-bounded undo (5-30 s) is preferred over modal confirmation where possible.
