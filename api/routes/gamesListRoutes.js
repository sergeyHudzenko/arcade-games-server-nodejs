'use strict';
module.exports = (app) => {
  const gamesList = require('../controllers/gamesListController');

  app
    .route('/api/v1/games')
    .get(gamesList.get_games_list);
  app
    .route('/api/v1/games/:id')
    .get(gamesList.get_single_game);
  
};
