// @ts-nocheck
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// 在 preload 脚本中。
const { ipcRenderer, contextBridge, remote, shell } = require('electron')
// const fs = require('fs');
// const fs = remote.require('fs');
ipcRenderer.on('stopVideo', async (event, value) => {
  let blobNew = dataURLtoBlob(value)
  const blob = new Blob([blobNew], { type: "video/webm" });
  const buffer = Buffer.from(await blob.arrayBuffer());
  console.log(buffer, 'buffer')
  var url = window.URL.createObjectURL(blob);
  console.log(url,'url')
  var a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.click()
  // fs.writeFile('test.webm', buffer, () => {
  // shell.openPath('test.webm');
  //   // mediaRecorder = null;
  //   // chunks = []
  // });

})

function dataURLtoBlob(dataURL) {
  var BASE64_MARKER = ';base64,';
  var parts;
  var contentType;
  var raw;
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(',');
    contentType = parts[0].split(':')[1];
    raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  parts = dataURL.split(BASE64_MARKER);
  contentType = parts[0].split(':')[1];
  raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);
  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}



contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    ...ipcRenderer,
    on: ipcRenderer.on.bind(ipcRenderer),
    removeListener: ipcRenderer.removeListener.bind(ipcRenderer),
  }
});