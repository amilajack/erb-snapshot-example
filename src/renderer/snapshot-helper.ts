// check if snapshot is available
if (typeof snapshotResult !== 'undefined') {
  snapshotResult.setGlobals(global, {}, window, document, console, {});
  snapshotResult.customRequire.cache['./renderer.js'].exports.render();
}
