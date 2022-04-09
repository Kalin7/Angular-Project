function checkFormData(data) {
    
    let errorHolder = [];

    if (data.rePass && data.rePass !== data.password) {
        errorHolder.push({message: 'Passwords do not match'})
    }
    Object.entries(data).forEach(d => {
        if (d[1] == '') {
            errorHolder.push({message: `${d[0]} is required`});
        }
    });

    if (errorHolder.length > 0) {
        throw new Error(errorHolder)
    }
}

function getTokenFromHeader(reqHeaders) {
    let header;
    reqHeaders.rawHeaders.forEach((h) => {
        if (h.includes('Bearer')) {
            header = h
        }
    });
    if (!header) {
        return '401'
    }
    return header.split(':')[1].split('"')[1];
}

function errorHandler(error) {
    
    let errorsList = [];
    if (error.name == 'ValidationError') {
        Object.values(error.errors).forEach(e => {
            errorsList.push({message: e.properties.message});
        })
    }else {
        errorsList.push({message: error.message});
    }
    
    return errorsList;
}

module.exports = {
    checkFormData,
    errorHandler,
    getTokenFromHeader
}