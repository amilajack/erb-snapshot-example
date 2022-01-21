import path from 'path';
import vm from 'vm';
import childProcess from 'child_process';
import fs from 'fs';
import electronLink from 'electron-link';
import paths from '../configs/webpack.paths';

// snapshot.js
class SnapshotCreator {
  mksnapshot: string;
  snapshot: string;
  linked: string;
  linkedContent: string | null;
  source: string;

  constructor(source: string, linked: string, snapshot: string) {
    this.source = source;
    this.linked = linked;
    this.linkedContent = null;
    this.snapshot = snapshot;
    this.mksnapshot = path.join(
      'node_modules',
      '.bin',
      'mksnapshot' + (process.platform === 'win32' ? '.cmd' : '')
    );
  }

  async link() {
    let result = await electronLink({
      baseDirPath: paths.distRendererPath,
      mainPath: this.source,
      cachePath: paths.distRendererPath + '/cache',
      shouldExcludeModule: (modulePath) => false,
    });

    const snapshotScriptPath = `${paths.distRendererPath}/cache/snapshot.js`;
    fs.writeFileSync(snapshotScriptPath, result.snapshotScript);

    // Verify if we will be able to use this in `mksnapshot`
    vm.runInNewContext(result.snapshotScript, undefined, {
      filename: snapshotScriptPath,
      displayErrors: true,
    });

    this.linkedContent = result.snapshotScript;
  }

  createSnapshot() {
    childProcess.execFileSync(
      this.mksnapshot,
      [this.linked, '--output_dir', paths.rootPath],
      { stdio: 'inherit' }
    );
  }

  saveLinkedFile() {
    fs.writeFileSync(this.linked, this.linkedContent);
  }
}

async function main() {
  const source = path.join(paths.distRendererPath, 'renderer.js');
  const linked = path.join(paths.distRendererPath, 'snapshot.js');
  const snapshot = path.join(paths.rootPath);
  const snapshotCreator = new SnapshotCreator(source, linked, snapshot);
  await snapshotCreator.link();
  snapshotCreator.saveLinkedFile();
  snapshotCreator.createSnapshot();
}

main().catch(console.error);
