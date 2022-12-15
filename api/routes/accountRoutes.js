'use strict';
module.exports = (app) => {
  const account = require('../controllers/accountController');

  app
    .route('/api/v1/user')
    .get(account.get_account_info);
};
