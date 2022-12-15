'use strict';
module.exports = (app) => {
  const ledgerList = require('../controllers/ledgerController');

  app
    .route('/api/v1/ledger')
    .get(ledgerList.get_ledger_list);
};
