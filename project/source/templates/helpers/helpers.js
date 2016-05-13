module.exports.register = function (Handlebars) {

    // Display dynamic year in footer
    Handlebars.registerHelper('color-iterator', function (arr, city, name)  {

        var els = '';
        for (var i = 0, j = arr.length; i < j; i++) {
            var number = Number(i+1).toString();
            els += "<span class='color color-" + number + " " + city + '-' + name + "'><span class='hex'>" + "Color " + number + ": #" + arr[i] + "</span></span>"
        }
        return new Handlebars.SafeString(els);
    });
}