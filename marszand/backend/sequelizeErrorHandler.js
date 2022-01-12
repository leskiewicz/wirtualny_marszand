module.exports = (err) => {
    const errObj = {};

    err.errors.map( er => {
        if(er.message.endsWith("cannot be null")) {
            errObj[er.path] = "Pole " + er.path + " nie może być puste";
        } else {
            errObj[er.path] = er.message;
        }
    })

    const output = { success: false, errors: errObj } 

    return output;
} 