
API: Express RESTful API mit CORS und MongoDB


API Funktionen: 

- Tagesresumee
- Notizen machen / Ziele für nächsten Tag formulieren und nach Wichtigkeit ordnen
- Größtes Learning notieren
- Login/Registrieren mit Google, Facebook oder neuem Konto
- Passwort zurücksetzen mit Email-Token
- Bearbeitung der Ziele
- Langfristige Ziele ( Woche, 1 Monat, 6 Monate etc)


Ziel: Leute sollen Ziele erreichen und langfristig glücklich werden. Dabei unabhängig von anderen sein. Nur der Kontoinhaber kann seine Bewertungen und Notizen etc sehen

----------

Benötigte API Endpunkte:
/auth (login/registrierung für user)
/days (die Tage die der Nutzer erstellt hat, um z.B. Aufgaben zu listen oder um den Tag zu dokumentieren) // private
/days/day_id (detailierte Daten für den ausgewählten Tag)
/weeks (Wochen-Zusammenfassungen die der Nutzer erstellt hat) // private
/months (Monats-Zusammenfassungen die der Nutzer erstellt hat) // private
/stats (ggf. Statistiken über Durchschnittszufriedenheit mit den gespeicherten Tagen) // private

-----------

Benötigte MongoDB Models:
User
DailyOverview
Weekly Overview
Monthly Overview