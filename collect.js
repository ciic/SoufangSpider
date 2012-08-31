/**
 * Created with JetBrains WebStorm.
 * User: ciic
 * Date: 12-8-31
 * Time: 下午2:59
 * To change this template use File | Settings | File Templates.
 */


var $ = require('jquery');
var http = require('http');

var options = {
    host:'soufun.com',
    port:80,
    path:'/house/%B1%B1%BE%A9_________________2_.htm'
};

var html ='';

http.get(options, function (res) {
    res.on('data',function (data) {
        html += data;
    }).on('end', function () {
            var dom = $(html);
            var now = new Date();
            console.log('本页有', dom.find("div.info").length);

            dom.find("div.info").each(function() {

                //console.log('   title -', $(this).find("div.name").text());
                //console.log('   price -', $(this).find("span.price_type").text());
                //console.log('   kaifashang -', $(this).find("div.s2:first").text());
               // console.log('   address -', $(this).find("div.s2:end").text());
                //console.log('   type -', $(this).find("div.dot6").text());

                var Db = require('mongodb').Db;
                var Server = require('mongodb').Server;
//TODO 储存后并查询出来。

                    var soufang={};
                soufang.name=$(this).find("div.name").text();
                soufang.price=$(this).find(".anther>div.antherBox span.price_type").text();
                soufang.dept=$(this).find("li.s2:first").text();
                soufang.type=$(this).find("div.dot6").text();

                console.log('   json -', soufang);
                    var db=new Db('test',new Server('localhost',27017,{auto_reconnect:true}, {}));
                    db.open(function(){
                        console.log('db opened');
                        db.collection('soufang',function(err,collection){
                            if (err) callback(err);
                            collection.insert(soufang,{safe:true},function(err,docs){
                                console.log(docs[0]._id);
                                //res.redirect('showUsers');
                            });
                        });
                    });




            });




        });
});

