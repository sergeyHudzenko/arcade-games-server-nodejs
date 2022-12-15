const { checkToken } = require('../middleware/checkToken')
const { gamesData } = require('../data/gamesData');

/**
 * Get games list
 * GET
 */
exports.get_games_list = async (req, res) => {
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
          message: 'Games list found',
          data: gamesData
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
        message: 'Something went wrong fetching all games - General Error',
        data: null,
      });
    }
  }
};

/**
 * Get single game
 * GET
 * PARAMS: /:id
 */
exports.get_single_game = async (req, res) => {
  const { id } = req.params;
  const { token } = req.headers;

  if (!id && !token) {
    res.status(400).json({
      success: false,
      message: 'Missing request data',
      data: null,
    });
  } else {
    try {
      let tokenValid = await checkToken(token);
      
      if (tokenValid.success) {
        let singleGameData = gamesData.filter(data => data.id == id)

        if(singleGameData.length) {
          res.status(200).json({
            success: true,
            message: 'Single game found',
            data: singleGameData[0]
          });
        } else {
          res.status(400).json({
            success: false,
            message: `Couldn't find single game`,
            data: null,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: `Token invalid.`,
          data: null,
        });
      }
    } catch {
      res.status(400).json({
        success: false,
        message: 'Something went wrong fetching single game - General Error',
        data: null,
      });
    }
  }
};
