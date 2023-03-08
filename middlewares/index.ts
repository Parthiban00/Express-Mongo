import {verifyToken} from './authJwt'
import {checkDuplicate} from './verifySignUp'

export const middlewares = {
    verifyToken,
    checkDuplicate
}