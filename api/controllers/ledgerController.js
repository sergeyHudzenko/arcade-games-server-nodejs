const { ledgerData } = require('../data/ledgerData');
const { checkToken } = require('../middleware/checkToken')

/**
 * Get ledger list
 * GET
 */
exports.get_ledger_list = async (req, res) => {
  const { token } = req.headers;

  if (!token) {
    res.status(400).json({
      success: false,
      message: 'Missing token',
      data: null,
    });
  } else {
    try {
      let tokenValid = await checkToken(token);
      if (tokenValid.success) {
        res.status(200).json({
          success: true,
          message: 'Ledger list found',
          data: ledgerData
        });
      } else {
        res.status(400).json({
          success: false,
          message: `token invalid.`,
          data: null,
        });
      }
    } catch {
      res.status(400).json({
        success: false,
        message: 'Something went wrong fetching ledger list - General Error',
        data: null,
      });
    }
  }
};
