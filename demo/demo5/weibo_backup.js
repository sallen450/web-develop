/**
 * Created by qinghua on 15/6/30.
 * Description: 微博收藏备份脚本
 *
 * 微博短连接转换接口API说明：http://open.weibo.com/wiki/Short_url/expand
 */


var https = require('https');
var fs = require('fs');

var writeFileOption = {
    flags: 'a+',
    encoding: null,
    mode: 0666
};

var options = {
    hostname: 'api.weibo.com',
    path: '/2/favorites.json?access_token=yourToken&page=1',
    method: 'GET'
};

var date = getFormatDate();
var preFileName = '/yourPath/' + date + '/weibo_fav_';
var urlPath = '/2/favorites.json?access_token=yourToken&page=';
var fileContent = fs.readFileSync('/yourPath/count.ini');       //已经存储的微博数量
var savedCount = parseInt(fileContent || 0);
var totalCount = undefined;
var countPerPage = 20;
var page = 1;
var needSavePages = undefined;
var fileNameIndexBase = Math.ceil(savedCount / 20);

function getFavoriteOnce() {
    var fileName = preFileName + (page + fileNameIndexBase) + ".txt";
    options.path = urlPath + page;

    var wfs = fs.createWriteStream(fileName, writeFileOption);


    var req = https.request(options, function (res) {
        console.log('[status]\tstatusCode: ', res.statusCode);
        res.on('data', function (d) {
            if (res.statusCode == 403) {
                console.log("[error]\t\tcode: " + d.toString().match(/"error_code":([\d]+),/)[1] + ";\tinfomation: " + d.toString().match(/"error":"(.+)",/)[1]);
                fs.writeFileSync('/yourPath/count.ini', totalCount - countPerPage * (page - 1));
                needSavePages = 0;
                return;
            }

            if (totalCount === undefined) {
                var tc = d.toString().match(/"total_number":([\d]+)/);
                if (tc !== null) {
                    totalCount = parseInt(tc[1]);

                    if (needSavePages === undefined) {
                        needSavePages = Math.ceil((totalCount - savedCount) / countPerPage);
                    }

                    console.log("[init]\t\t" + needSavePages + " pages need save.");
                    console.log("[init]\t\t" + (totalCount - savedCount) + "条收藏需要保存。");

                }
            }

            wfs.write(d);
        });

        res.on('end', function () {
            wfs.end();

            if (page < needSavePages) {
                console.log("[process]\tpage saved " + page + "/" + needSavePages);
                console.log('**********************************');
                setTimeout(getFavoriteOnce, 1000);
            }


            if (page === needSavePages) {
                fs.writeFileSync('/yourPath/count.ini', totalCount || savedCount);
                console.log("[process]\tpage saved " + page + "/" + needSavePages);
                console.log('**********************************');
                console.log("[process]\tcomplete!");
            }

            page++;
        });
    });

    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}

function getFormatDate() {
    var date = new Date();
    var year = "" + date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return year + month + day;
}


// run
fs.mkdirSync('/yourPath/' + date);
getFavoriteOnce();
