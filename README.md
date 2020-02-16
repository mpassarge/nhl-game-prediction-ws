# Nhl System

A service to to handle Game Predictions

---
## Create a Game Slip of Predictions
**Definition**
`POST /api`

```json
{
  "date": "2020-01-01",
  "gamePicks": [
    {
      "gameId": "2019020626",
      "winningTeam": "Dallas Stars"
    }
  ]
}
```

**Response**

- `200 OK` on success

```json
{
  "_id": "5e0e330ae0019c0056e06f30",
  "date": "2020-01-01",
  "gamePicks": [
    {
      "gameId": "2019020626",
      "winningTeam": "Dallas Stars"
    }
  ],
  "__v": 0
}
```

## Get a Game Slip of Predictions
**Definition**
`GET /api?date=2020-01-02`

**Response**

- `200 OK` on success

```json
{
  "_id": "5e0e330ae0019c0056e06f30",
  "date": "2020-01-01",
  "gamePicks": [
    {
      "gameId": "2019020626",
      "winningTeam": "Dallas Stars"
    }
  ],
  "__v": 0
}
```

---
#### Notes
Previous Repo/History: [nhl-game-prediction](https://github.com/mpassarge/nhl-game-prediction)