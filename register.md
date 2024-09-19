1. React'e sukurti registracijos forma

2. DB sukurti nauja USERS lentele:

    - id
    - username
    - password -> hash() -> pass_hash

    hash('a') -> 128
    hash('sadsafsdgasdfagasgasf') -> 128
    hash('sadsafsdgasdfagasgasf'.repeat(10000000000)) -> 128

3. is formos surenkame duomenis

4. validacijos, kliento puseje:

    - username -> ne per trumpas ir ne per ilgas
    - password -> ne per trumpas ir ne per ilgas

5. surinkti duomenys verciami i JSON formata

6. fetch() -> siunciame JSON i serveri

7. pasidaryti /api/register rout'a, kuris priima is kliento atsiustus duomenis

8. validacijos, serverio puseje:

    - username -> ne per trumpas ir ne per ilgas
    - password -> ne per trumpas ir ne per ilgas

9. i DB:USERS lentele irasyti formoje pateiktus duomenis

10. grazinamas atsakymas klientui:

    - pavyko uzregistruoti
    - nepavyko uzregistruoti

# -----------------------------------------------------

11. klientas gauna rezultata

12. klientas atvaizduoja pranesima:
    -   pavyko uzsiregistruoti
    -   nepavyko uzsiregistruoti
