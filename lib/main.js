'use babel';

import os from 'os';
import glob from 'glob';

export function provideBuilder() {

  return class XcodeBuildProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'Xcode';
    }

    isEligible() {
      if (os.platform() === 'darwin') {
        if (glob.sync('*.@(xcodeproj|xcworkspace)', this.cwd).length >= 1) {
          return true; // Project running on OS X and contains Xcode project.
        }
        return false; // Project is running on OS X, doesn't contain Xcode project.
      }
      return false; // Not running on OS X, no point checking for Xcode project.
      // TODO: May wish to reevaluate this approch in the cases of GnuStep and WinObjC...
    }

    settings() {

    return {
        exec: 'xcodebuild',
        errorMatch: [
          '(?<file>.+):(?<line>\\d+):(?<column>\\d+):\\s+(?<type>\\w+):\\s+(?<message>.+)'
        ]
      };
    }
  }
}
