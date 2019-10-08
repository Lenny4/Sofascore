# Récupérer par date (jour) la liste des matchs

L'url pour récupérer l'ensemble des events d'une journée est la suivante :

- https://www.sofascore.com/<"sportName">//<"DateFormat(aaa-mm-dd)">/json?_=157053420
- Exemple: https://www.sofascore.com/football//2019-10-05/json?_=157053420

Format de retour :

` 
sportItem: {

    tournament: [
        category: {
            name: String,
            priority: Int
        },
        events: [
            id: Long,
            name: String,
        ]
    ]
}
`

# Récupérer un event via son ID

L'url pour récupérer les données d'un événement spécifique
- https://www.sofascore.com/event/<"eventId">/json?_=157053529
- Exemple : https://www.sofascore.com/event/8280713/json?_=157053529



