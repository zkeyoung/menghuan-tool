const { version } = require('./package.json');
const path = require('node:path');
module.exports = {
  packagerConfig: {
    name: 'menghuan-tool',
    executableName: 'menghuan-tool',
    asar: true,
    ignore: [
      "^/node_modules",
      "^/src",
      "forge.config.js",
      "tsconfig.json",
      "LICENSE",
      ".gitignore",
      ".vscode",
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: (arch) => ({
        name: 'menghuan-tool',
        authors: 'zkeyoung',
        exe: 'menghuan-tool.exe',
        noMsi: true,
        setupExe: `menghuan-tool-${version}-win32-${arch}-setup.exe`,
      }),
    },
  ],
};
