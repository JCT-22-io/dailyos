\# ADR-003



Titel



Dashboard wird vollständig dynamisch erzeugt.



Status



Akzeptiert



Entscheidung



Das Dashboard besteht ausschließlich aus Modulen,

die in modules.js registriert werden.



dashboard.js kennt keine Modulnamen.



Begründung



Neue Module können ergänzt werden,

ohne dashboard.js ändern zu müssen.



Konsequenzen



\+ Sehr gut erweiterbar

\+ Einheitliche Module

\- Etwas komplexere Architektur

