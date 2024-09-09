# Turizmas

Vartotoju roles:

-   admin
-   user

Platformoje yra registruotos vietos, ta daro Admin:

-   pavadinimas
-   adresas
-   koordinates
-   nuotraukos???
-   video???

Registruojasi vartotojai, kurie gali susidaryti keliones plana/marsruta:

-   pasirenka is lankytinu vietu saraso
-   saraso galima filtruoti

Neregistruoti vartotojai gali matyti visas lankytinas vietas, tiesiog negali planuotis keliones.

## OPTIONAL:

-   Vartotojas gali pasiulyti nauja lankytina vieta

## Pages

-   public:
    -   pagrindinis
    -   lankytinu vietu sarasas
    -   individualios lankytinis vietos informacija
    -   login
    -   register
    -   404
    -   logout
-   admin:
    -   lankytinu vietu sarasas (lentele + delete ikona)
    -   individualios lankytinis vietos informacija
    -   lankytinos vietos registracijos forma
    -   lankytinos vietos redagavimo forma
    -   vartotoju sarasas (lentele + delete ikona)
    -   vartotojo informacija:
        -   pasirinkto vartotojo sudarytos keliones planas
-   user:
    -   keliones planavimo irankis
        -   trinti
        -   sukeisti vietomis
    -   profilio informacija
        -   turetu leisti pasikeisti bazine info
        -   turetu leisti pasikeisti password
        -   galimybe pasalinti savo paskyra

### OPTIONAL PAGES

-   public
    -   kontaktu forma (email, zinute)
-   admin
    -   kontaktu sarasas (email, zinute, laikas + delete)
    -   atsiliepimai apie vietas
-   user
    -   kontaktu forma (email (uzpildytas ir nerodomas), zinute)
    -   atsiliepimo forma

## Projekto kodo architektura

-   frontend:
    -   visi puslapiai yra ant react, aka SPA
-   backend + db:
    -   api
-   other:
    -   cookies
    -   localStorage????
