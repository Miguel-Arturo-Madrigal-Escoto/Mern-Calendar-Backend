
const moment = require('moment');

const isDate = (value, { req }) => {

    if (!value){
        return false;
    }

    return moment(value).isValid()

}

module.exports = { isDate };