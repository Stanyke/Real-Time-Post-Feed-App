exports.appResponse = (statusCode, message, data) => {
    const status = statusCode.toString();
    const firstCharacterOfStatusCode = status[0];
    if(firstCharacterOfStatusCode === "4"){
        if(status === "401"){
            return {data: {success: false, message: message || "Unauthorized user"}, statusCode};
        }
        return {data: {success: false, message: message || "Bad request"}, statusCode};
    } else if(firstCharacterOfStatusCode === "5"){
        return {data: {success: false, message: message || "We encountered an error"}, statusCode};
    }
    return {data: {success: true, message, data}, statusCode};
}