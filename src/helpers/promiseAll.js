import _ from 'lodash';

// eslint-diable-next-line func-names
export default async function (object, async = true) {
  const resolvedObject = _.isArray(object) ? [] : {};
  const keys = Object.keys(object);
  if (async === false) {
    for (const index in keys) {
      const key = keys[index];
      // eslint-disable-next-line no-await-in-loop
      resolvedObject[key] = await object[key];
    }
  } else {
    const resolvedArray = await Promise.all(Object.values(object));
    keys.forEach((key, index) => {
      resolvedObject[key] = resolvedArray[index];
    });
  }
  return resolvedObject;
}
