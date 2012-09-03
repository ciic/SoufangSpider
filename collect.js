/**
 * Created with JetBrains WebStorm.
 * User: ciic
 * Date: 12-8-31
 * Time: 下午2:59
 * To change this template use File | Settings | File Templates.
 */


var $ = require('jquery');
var http = require('http');
var Iconv = require('iconv').Iconv;

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var options = {
    host:'soufun.com',
    port:80,
    path:'/house/%B1%B1%BE%A9_________________2_.htm'
};

var buffers = [], size = 0;


var html ='';
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
http.get(options, function (res) {
    res.on('data',function (data) {
        buffers.push(data);
        size += data.length;
        //html += data;
    }).on('end', function () {
            var buffer = new Buffer(size), pos = 0;
            for(var i = 0; i < buffers.length; i++) {
                buffers[i].copy(buffer, pos);
                pos += buffers[i].length;
            }
            var gbk_to_utf8_iconv = new Iconv('GBK', 'UTF-8//TRANSLIT//IGNORE');
            var utf8_buffer = gbk_to_utf8_iconv.convert(buffer);
            var html = utf8_buffer.toString();
            var dom = $(html);
            var now = new Date();
            console.log('本页有', dom.find("div.searchListNoraml").length);

            dom.find("div.searchListNoraml").each(function() {

                //console.log('   title -', $(this).find("div.name").text());
                //console.log('   price -', $(this).find("span.price_type").text());
                //console.log('   kaifashang -', $(this).find("div.s2:first").text());
               // console.log('   address -', $(this).find("div.s2:end").text());
                //console.log('   type -', $(this).find("div.dot6").text());

                //var Db = require('mongodb').Db;
                //var Server = require('mongodb').Server;
//TODO 储存后并查询出来。

                    var soufang={};
                soufang.name=$(this).find("div.name").text();
                //console.log('',$(this).find("div.price").find("span"));

                    soufang.price=$(this).find("span.price_type").text();

                soufang.dept=$(this).find("li.s2:first").text();
                soufang.type=$(this).find("div.dot6").text();

                console.log('   json -', soufang);
//                    var db=new Db('test',new Server('localhost',27017,{auto_reconnect:true}, {}));
//                    db.open(function(){
//                        console.log('db opened');
//                        db.collection('soufang',function(err,collection){
//                            if (err) callback(err);
//                            collection.insert(soufang,{safe:true},function(err,docs){
//                                console.log(docs[0].price);
//
//                            });
//                        });
//                    });




            });




        });
});




app.get('/show',function(req,res){


    var db=new Db('test',new Server('localhost',27017,{auto_reconnect:true}, {}));
    db.open(function(){
        db.collection('soufang',function(err,collection){
            if (err) callback(err);
            collection.find({}).toArray(function(err,docs){
                if (err) callback(err);
                console.log(docs);

                res.render('showResult', {items:docs, title:'搜索结果' });
            });
        });
    });
});