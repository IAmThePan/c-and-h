var jsdom = require('node-jsdom');
var strips = {};

function getImages(date) {
    var dateStr = date.getUTCFullYear().toString() + '/' + (date.getUTCMonth() + 1).toString() + '/' + date.getUTCDate().toString();
    jsdom.env(
        "http://www.gocomics.com/calvinandhobbes/" + dateStr,
        ["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            var i, comic, obj = {}, comics = window.$('.strip');
            
            for (i = 0; i < comics.length; i++) {
                comic = comics[i];
                (comic.width === 600) ?
                    obj.imgSmall = comic.src :
                    obj.imgLarge = comic.src;
                
                strips[dateStr] = {
                    date:       dateStr,
                    imgSmall:   obj.imgSmall,
                    imgLarge:   obj.imgLarge
                }
                
                if (dateStr === '1985/12/31') console.log(strips);
            }
        }
    );
}

var startDate = new Date('1985/11/18');
var endDate = new Date('1986/1/1');

while (startDate <= endDate) {
    getImages(startDate);
    startDate.setDate(startDate.getDate() + 1);
}

/*
var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'http://gocomics.com',
  path: '/calvinandhobbes/1992/2/24'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
*/


/*
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'odin',  
    database : 'comic_strips'
});

connection.connect();

var values = {
    'img_big': 'caleb1',
    'imb_small': 'silas1'
};
connection.query("INSERT INTO strips VALUES ('caleb', 'silas', '1994-01-01')", function(err) {
    if (err) {
        console.log('Insert Error', err.toString());
    }
    else {
        console.log('Insert Success');
    }
});

connection.query('SELECT * FROM strips', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.\n');
});

connection.end();
*/
