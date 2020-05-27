let markdown = require("helper-markdown");

module.exports = {
    fiveWords: function(p) {
        return p.split(" ").splice(0,5).join(" ");
    },
    markdown: markdown
}