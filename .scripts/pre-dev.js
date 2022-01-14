/**
 * Script used to setup project necessities which are mandatory for project development.
 * And developer shouldn't worry about them.
 *
 * Currently, this script will create pre commit hook which will lint code.
 */
 var fs = require('fs');

 const HOOKS_SRC = '.scripts/githooks/';
 const HOOKS_DST = '.git/hooks/';

 function copyHook(hookFileName) {
   fs.createReadStream(`${HOOKS_SRC}${hookFileName}`)
     .pipe(fs.createWriteStream(`${HOOKS_DST}${hookFileName}`));
 }

 /**
  * Main function, execution starts here.
  */
 (function main() {
   const args = process.argv.slice(2);

   copyHook('pre-commit');
 })();
