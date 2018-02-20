/**
 * Created by eatong on 18-2-17.
 */
/**
 * Created by eatong on 18-2-17.
 */
const fs = require('fs');
const archiver = require('archiver');
const moment = require('moment');

// create a file to stream archive data to.
const output = fs.createWriteStream(`build/${moment().format('YYYY-MM-DD')}build.zip`);
const archive = archiver('zip', {
  zlib: {level: 9} // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err;
});

archive.directory('bin/', 'bin');
archive.directory('dist/', 'dist');
archive.directory('server/', 'server');
archive.file('index.js');
archive.file('package.json');
archive.file('yarn.lock');

archive.pipe(output);


archive.finalize();
