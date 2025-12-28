const logger = require('../loggers/logger');
const info = require('../constants/notificationInfo');
const httpCons = require('../constants/statusConstants');


const authorizeRole = (allowedRoles) => {
    return (req,res,next) => {
        try{
        const user_role = req.headers['x-user-role'];
        if(allowedRoles.includes(user_role)){
            logger.info(`SERVICE - ${info.SERVICE} :${info.ROLE_VALIDATION}`);
            next();
        }
        else{
            logger.info(`SERVICE - ${info.SERVICE} : Message - ${info.ROLE_VALIDATION_FAIL}`);
            return res.status(httpCons.FORBIDDEN).json({message: info.ACCESS_DENIED});
        }
    }
    catch(error){
        logger.error(`SERVICE - ${info.SERVICE} - Message: ${info.ERROR_VALIDATING_ROLE}`);
         return res.status(httpCons.INTERNAL_SERVER_ERROR).json({Message:info.ERROR_VALIDATING_ROLE,Error:error.message});
    }
    }
}

module.exports = {
    authorizeRole
}