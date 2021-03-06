var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //Use fs to read the file
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var body = '';
    body += data;
    var urlLists = body.split('\n');

    callback(urlLists);   
  });
  //Use the callback to return each line of the file to be item in the array
};

exports.isUrlInList = function(url, callback) {
  
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var body = '';
    body += data;
    var urlLists = body.split('\n');

    for (var i = 0; i < urlLists.length; i++) {
      callback(urlLists[i] === url);
    }
  });
  
};

exports.addUrlToList = function(url, callback) {
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var body = url + '\n';
    body += data;
    
    fs.writeFile(this.paths.list, body, (err, data) => {
      if (err) { 
        throw err;
      }
      console.log('The file has been saved!');
    });
    callback();
  });
};

exports.isUrlArchived = function(url, callback) { 
  
  fs.readdir(this.paths.archivedSites, (err, files) => {
    // check each of the items in the files array against the url
      //if match return true
      //else return false
    var flag = false;  
    files.forEach(function(file) {
      if (file === url) {
        flag = true;
      }    
    });
    callback(flag);
  });  
};

exports.downloadUrls = function(urls) {
  
  urls.forEach(function(url) {
    fs.writeFile(this.path.archivedSites + url); 
  });
};
