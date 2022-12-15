const checkToken = (req) => {
    let token = req;
    return new Promise((resolve, reject) => {
      if (!token) {
        reject({ success: false, message: 'No token' });
      } else if (token == "secret") {
        resolve({
            success: true,
            message: 'Token is valid',
        });
        }
    });
};
  
module.exports = { checkToken };