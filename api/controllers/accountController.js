const { checkToken } = require('../middleware/checkToken')
const { accountData } = require('../data/accountData');

/**
 * Get account info
 * GET
 */
exports.get_account_info = async (req, res) => {
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
          message: 'Account info fetched succesfull',
          data: accountData
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
        message: 'Something went wrong fetching account info - General Error',
        data: null,
      });
    }
  }
};