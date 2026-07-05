---
title: Cover Template
device: template
version: 1.0
date: 2026-08
---

<!--
This is the COVER PAGE rendered as page 1 of each per-device manual.
Per-device renderers may inline this and substitute the {{DEVICE_NAME}} and
{{DEVICE_VERSION}} placeholders, or render it standalone and pre-pend the
resulting PDF page to the per-device MANUAL.pdf.

Brand palette:
  base background       #0B1220   (deep navy near black)
  primary text          #F2F4F8   (off-white)
  accent cyan           #27E5FF
  accent magenta        #FF3DA8
  font primary          IBM Plex Sans
  font monospace        JetBrains Mono

Layout target: 8.5 in x 11 in (US Letter); 1 in margins; centred composition.
EU A4 fallback uses same layout, scaled to fit.
-->

\thispagestyle{empty}
\vspace*{2in}

\begin{center}

{\Huge \textbf{THOX.ai}}

\vspace{0.5in}

{\Large User Manual}

\vspace{2in}

{\HUGE \textbf{ \{\{DEVICE\_NAME\}\} }}

\vspace{1in}

Version \{\{DEVICE\_VERSION\}\}

August 2026

\vspace{2in}

\textit{Local-first compute, designed in Tulsa, Oklahoma}

\end{center}

\newpage
