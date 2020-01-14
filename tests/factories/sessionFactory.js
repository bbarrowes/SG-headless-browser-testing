const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user)=>{
    // Make a session object out of this user id
        const sessionObject = {
            passport:{
                user: user._id.toString()
            }
        }
        const session = Buffer.from( JSON.stringify(sessionObject)).toString('base64');
    // Create a signature for that sessionString
        const sig = keygrip.sign('session=' + session );
    // return
        return {
            session,
            sig
        }
}