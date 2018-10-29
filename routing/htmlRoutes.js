//path package to get correct file path for html
//=================================================

var path = require("path");

module.exports = function(app) {
    //HTML GET requets
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home"));
    });

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey"));
    });

};

    

