const path = require('node:path');

const popExt = function(ext,req) {
  let fp = '';
  let ct = '';
  
  if (ext === '.html') {
    fp = path.join('public', 'html', path.basename(req));
  } else if (ext === '.css') {
    fp = path.join('public', 'css', path.basename(req));
    ct = 'text/css; charset=UTF-8';
  } else if (ext === '.js') {
    fp = path.join('public', 'script', path.basename(req));
    ct = 'application/javascript; charset=UTF-8';
  } else if (ext === '.json') {
    fp = path.join('public', 'script', path.basename(req));
    ct = 'application/json; charset=UTF-8';
  } else if (ext === '.png') {
    fp = path.join('public', 'img', path.basename(req));
    ct = 'image/png';
  }

  return {fp, ct};
}

module.exports = popExt;