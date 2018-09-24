
const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const uppercamelize = require('uppercamelcase');
const version = process.env.VERSION || require('../../package.json').version;
const tips = '// This file is auto gererated by build/bin/build-entry.js';
const root = path.join(__dirname, '../../');
const join = dir => path.join(root, dir);



function buildDemoEntry() {
  const dir = path.join(__dirname, '../../packages');
  const demos = fs.readdirSync(dir)
    .filter(name => fs.existsSync(path.join(dir, `${name}/demo/index.vue`)))
    .map(name => `'${name}': asyncWrapper(r => require.ensure([], () => r(componentWrapper(require('../../packages/${name}/demo'), '${name}')), '${name}'))`);

  const content = `${tips}
import { asyncWrapper, componentWrapper } from './demo-common';

export default {
  ${demos.join(',\n  ')}
};
`;
  fs.writeFileSync(path.join(dir, '../docs/src/demo-entry.js'), content);
}


buildDemoEntry();

