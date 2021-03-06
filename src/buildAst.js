import _ from 'lodash';

const stringify = (item) => {
  if (!_.isObject(item) && !_.isNumber(item)) {
    return item;
  }

  if (_.isNumber(item)) {
    return String(item);
  }

  const keys = Object.keys(item);
  return keys.reduce((acc, key) => ({ ...acc, [key]: stringify(item[key]) }), {});
};

const buildAst = (config1, config2) => {
  const keys = _.union(Object.keys(config1), Object.keys(config2)).sort();

  return keys.map((key) => {
    if (!_.has(config2, key)) {
      return {
        name: key,
        value: stringify(config1[key]),
        status: 'deleted',
      };
    }

    if (!_.has(config1, key)) {
      return {
        name: key,
        value: stringify(config2[key]),
        status: 'added',
      };
    }

    if (config1[key] === config2[key]) {
      return {
        name: key,
        value: stringify(config1[key]),
        status: 'unchanged',
      };
    }

    if (_.isObject(config1[key]) && _.isObject(config2[key])) {
      return {
        name: key,
        children: buildAst(config1[key], config2[key]),
        status: 'parent',
      };
    }

    return {
      name: key,
      oldValue: stringify(config1[key]),
      newValue: stringify(config2[key]),
      status: 'changed',
    };
  });
};

export default buildAst;
