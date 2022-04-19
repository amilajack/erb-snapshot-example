/* eslint-disable */
interface SnapshotModuleCache {
  exports: {
    render: () => void;
  };
}

declare var snapshotResult:
  | undefined
  | {
      setGlobals: (...items: Object[]) => void;
      customRequire: {
        cache: Record<string, SnapshotModuleCache>;
      };
    };
