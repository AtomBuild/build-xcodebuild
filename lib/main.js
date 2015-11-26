'use babel';

import os from 'os';
import glob from 'glob';

function isEligable(cwd) {
  if (os.platform() === 'darwin') {
    if (glob.sync('*.@(xcodeproj|xcworkspace)', {cwd}).length >= 1) {
      return true; // Project running on OS X and contains Xcode project.
    }
    return false; // Project is running on OS X, doesn't contain Xcode project.
  }
  return false; // Not running on OS X, no point checking for Xcode project.
  // TODO: May wish to reevaluate this approch in the cases of GnuStep and WinObjC...
}

function settings(path) {

}

function on(ev, callback) {

}

function off(ev) {

}

export function provideBuilder() {
  return {
    niceName: 'Xcode',
    isEligable,
    settings,
    on,
    off
  };
}
