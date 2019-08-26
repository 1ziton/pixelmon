this.importScripts('/assets/js/md5.min.js');

function getFlieMd5(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const hash = md5(event.target.result);
      resolve(hash);
    };
    reader.readAsText(file);
  });
}

this.onmessage = event => {
  getFlieMd5(event.data).then(hash => {
    this.postMessage(hash);
  });
};
