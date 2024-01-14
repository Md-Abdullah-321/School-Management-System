/*
 * Title: Cookie 
 * Description: Set Access Token here
 * Author: Md Abdullah
 * Date: 14/01/24
 */


const setAccessTokenCookie = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
}


module.exports = {
    setAccessTokenCookie
}