let markdown = require("helper-markdown");
let moment = require("moment");

module.exports = {
    createExcerpt: function (body, sentences) {
        return markdown(body).split("<p>")[1].split('. ').slice(0, sentences).join('. ') + '.';
        // console.log("body: ", body)
        // return body
    },
    createTestimonyExcerpt: function (body) {
        return body.split(".")[0] + '. '
    },
    fiveWords: function (p) {
        return p.split(" ").splice(0, 5).join(" ");
    },
    getBlogSingleDate: function (date) {
        return moment(date).format('MMMM D, YYYY')
    },
    getDay: function (date) {
        return moment(date).format('D');
    },
    getMonth: function (date) {
        return moment(date).format('MMM');
    },
    markdown: markdown,
    markdownFancyUL: function (body) {
        return markdown(body).replace("<ul>", `<ul class="gt-list gt-type-2">`)

    },
    isOne: function (value) {
        // console.log("val length", value.length)
        return value.length == 1;
    },
    getPhotoGalleryDate: function(date) {
        return moment(date).format("MMMM DD YYYY   ")
    }
}