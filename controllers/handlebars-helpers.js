let markdown = require("helper-markdown");
let moment = require("moment");

module.exports = {
    fiveWords: function(p) {
        return p.split(" ").splice(0,5).join(" ");
    },
    markdown: markdown,
    getDay: function(date) {
        return moment(date).format('D');
    },
    getMonth: function(date) {
        return moment(date).format('MMM');
    },
    createExcerpt: function(body) {
        return markdown(body).split("<p>")[1].split('. ').slice(0, 3).join('. ') + '.';
        // console.log("First P: ", firstPSentences)
        // return body
    }
}