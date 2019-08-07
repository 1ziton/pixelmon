const fs = require('fs-extra');
const path = require('path');

const nextJson = fs.readJSONSync(path.join(__dirname, '../../package.json'));
const nextVersion = nextJson.version;
const nextVersions = {
  ...nextJson.dependencies,
  ...nextJson.devDependencies,
};
const packagePath = path.resolve(__dirname, `../../../1ziton/package.json`);

const json = fs.readJSONSync(packagePath);
// Update third party
['dependencies', 'devDependencies'].forEach(type => {
  Object.keys(json[type])
    .filter(name => !!nextVersions[name])
    .forEach(name => {
      json[type][name] = nextVersions[name];
    });
});
// Update 1ziton libs
json.version = nextVersion;
['pikachu', 'acl', 'cache', 'mock', 'theme', 'util'].forEach(v => {
  json.dependencies[`@pixelmon/${v}`] = `^${nextVersion}`;
});
json.devDependencies[`@pixelmon/testing`] = `^${nextVersion}`;
json.devDependencies[`1ziton`] = `^${nextVersion}`;

// Save
fs.writeJSONSync(packagePath, json, {
  spaces: 2,
});
