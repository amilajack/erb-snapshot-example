if (typeof snapshotResult !== 'undefined') {
  console.log('snapshotResult available!', snapshotResult);
  snapshotResult.setGlobals(global, {}, window, document, console, {});
  snapshotResult.customRequire.cache['./renderer.js'].exports.render();
}
