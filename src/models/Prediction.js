const mongoose = require('mongoose');
const guessSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    }, 
    gamePicks: [
        {
            _id: false,
            gameId: {
                type: String,
                required: true
            },
            winningTeam: {
                type: String,
                required: true
            
            }
        }
    ]
});

module.exports = mongoose.model('prediction', guessSchema);

//{[{"gameId":2019020447,"winningTeam":"Chicago Blackhawks"},{"gameId":2019020448,"winningTeam":"Montréal Canadiens"},{"gameId":2019020449,"winningTeam":"Pittsburgh Penguins"},{"gameId":2019020450,"winningTeam":"Los Angeles Kings"},{"gameId":2019020451,"winningTeam":"Washington Capitals"}]}