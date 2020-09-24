const moment = require('moment');
const {format}=require('timeago.js');

const help = {};

help.timeago = date => {
    //return moment(date).startOf('minute').fromNow();
    return format(date);
};

module.exports= help;
