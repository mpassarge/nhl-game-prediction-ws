# Nhl System

A service to to handle game picks

### Create a Game Slip of Predictions
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

