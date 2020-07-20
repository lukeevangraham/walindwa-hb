let markdown = require("helper-markdown");
let moment = require("moment");

module.exports = {
    calculateAge: function (birthdate) {
        return moment().diff(moment(birthdate), 'years')
    },
    concat: function (string, addition) {
        return string + addition
    },
    createExcerpt: function (body, sentences) {
        return markdown(body).split("<p>")[1].split('. ').slice(0, sentences).join('. ') + '.';
        // console.log("body: ", body)
        // return body
    },
    createTestimonyExcerpt: function (body) {
        return body.split(".")[0] + '. '
    },
    givenNumberofWords: function (p, length) {
        return p.split(" ").splice(0, length).join(" ");
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
    getYear: function (date) {
        return moment(date).format('YYYY');
    },
    getPhotoGalleryDate: function (date) {
        return moment(date).format("MMMM DD YYYY   ")
    },
    isEven: function(value) {
        // console.log("VALUE", (value % 2 === 0))
        let even = (value % 2 === 0)
        // console.log("EVEN: ", even)
        return even
    },
    ifEquals: function(arg1, arg2 , options) {
return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    isOne: function (value) {
        // console.log("val length", value.length)
        return value.length == 1;
    },
    markdown: markdown,
    markdownFancyUL: function (body) {
        return markdown(body).replace("<ul>", `<ul class="gt-list gt-type-2">`)
    },
    each_upto: function (array, max, options) {
        if (!array || array.length == 0) {
            return options.inverse(this);
        }

        let result = [];
        for (let index = 0; index < max && index < array.length; index++) {
            result.push(options.fn(array[index]));
        }
        return result.join('');
    }
}