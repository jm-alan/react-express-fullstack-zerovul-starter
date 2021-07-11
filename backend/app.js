import appBuilder from './appBuilder';
import { ports } from './config';

// eslint-disable-next-line no-extend-native
String.prototype.upperCaseFirst = function () {
  return `${this[0].toUpperCase()}${this.slice(1)}`;
};

// eslint-disable-next-line no-extend-native
String.prototype.truncateUntil = function (pattern) {
  let out = this.toString();
  while (!out.match(pattern)) out = out.slice(0, out.length - 1);
  return out;
};

const apps = {};

for (const port of ports) appBuilder(apps, port);

module.exports = apps;
