import { sendPost, securityHook } from '../api/apiHooks'

export function sendPasscodeCheck(passcode) {
    sendPost("CODE", { Code: passcode, Result: false }, securityHook)
}
