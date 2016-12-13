import _ from 'lodash';

const modMap = {};

function validateCondition(target, condition) {
  let index = Object.keys(condition)
    .map(key => getIn(target, key) == condition[key])
    .indexOf(false);

  return index === -1 ? true : false;
}

function getIn(obj, path = '') {
  path = path.split('.');

  return path.reduce(function (prev, cur) {
    if (typeof prev === 'undefined') {
      return prev;
    } else {
      return prev[cur];
    }
  }, obj);
}

function setIn(obj, path, value) {
  path = path.split('.');

  let len = path.length;

  path.reduce(function (prev, cur, index) {
    if (index == len - 1) {
      prev[cur] = value;
    } else {
      prev[cur] = prev[cur] || {};
    }

    return prev[cur];
  }, obj || {});

  return obj;
}

function updateItem(target, update) {
  Object.keys(update).forEach(key =>
    setIn(target, key, (typeof update[key] === 'function' ?
      update[key].call(null, getIn(target, key)) :
      update[key]))
  );

  return target;
}

function conditionUpdate(target, condition, update) {
  return validateCondition(target, condition) ?
    updateItem(target, update) :
    target;
}

function conditionReplace(target, condition, replace) {
  return validateCondition(target, condition) ?
    replace :
    target;
}

export const updateCollection = _.curry((state, condition, update) =>
  state.map(item => conditionUpdate(item, condition, update))
);

export const replaceCollection = _.curry((state, condition, replace) =>
  state.map(item => conditionReplace(item, condition, replace))
);

export const dropCollection = _.curry((state, condition) =>
  state.filter(item => !validateCondition(item, condition))
);

export const toggleMaker = _.curry((key, val, condition, state) => updateCollection(
  state,
  condition,
  {[key]: val}
));

export const pendingOn = toggleMaker('pending', true);
export const pendingOff = toggleMaker('pending', false);

export const pendingOnById = (id, state) => pendingOn({
  id
}, state);

export const pendingOffById = (id, state) => pendingOff({
  id
}, state);

export const open = toggleMaker('isOpen', true);
export const close = toggleMaker('isOpen', false);

export const openById = (id, state) => open({
  id
}, state);

export const closeById = (id, state) => close({
  id
}, state);

export const updateCollectionById = (state, id, update) => updateCollection(state, {
  id
}, update);

export const replaceCollectionById = (state, id, replace) => replaceCollection(state, {
  id
}, replace);

export const dropCollectionById = (state, id) => dropCollection(state, {
  id: id
});

export const stubPayload = (state, {payload}) => payload;

export const extractFromMod = _.curry((mod, name) => (...args) => {
  let service = getMod(mod);

  return service[name].apply(service, args);
});

export function getMod(mod) {
  let module = modMap[mod];

  if (!module) {
    module = angular.element(document.querySelector("body"))
              .injector()
              .get(mod);
  }

  if (!module) {
    throw new Error('get invalid module');
  } else {
    modMap[mod] = module;

    return module;
  }
}

export function matchItem(targetList, source) {
  // force full copy
  targetList = angular.copy(targetList);

  let ids = [];

  if (angular.isArray(source)) {
    ids = source.map(item => '' + item.id);
  } else if (source && source.id) {
    ids = [source.id];
  }

  return targetList.map(item => {
    if (typeof(item.id) === "number") {
      item.id = '' + item.id;
    }

    if (ids.indexOf(item.id) > -1) {
      item.selected = true;
    }

    return item;
  });
}

export function validate(target, validators) {
  return validators.reduce((prev, {fn, error}) => {
    if (prev.valid && fn(prev.target)) {
      prev.valid = false;
      prev.error = error;
    }

    return prev;
  }, {
    valid: true,
    error: '',
    target: target
  });
}

export const transformKey = _.curry((map, obj) =>
  Object.keys(obj).map(key => {
    let transformItem = map[key],
        newKey,
        transformFn;

    if (typeof transformItem === 'string') {
      newKey = transformItem;
      transformFn = _.identity;
    } else if (Array.isArray(transformItem)) {
      [newKey, transformFn] = transformItem;
    } else {
      newKey = key;
      transformFn = _.identity;
    }

    return {
      key: newKey,
      value: obj[key],
      fn: transformFn
    };
  }).reduce((prev, {key, value, fn}) => {
    prev[key] = fn(value, obj);

    return prev;
  }, {})
);

export const condition = _.curry((expr, trueFn, falseFn) => expr ? trueFn() : falseFn());


const isTrue = val => val;
const isFalse = val => !isTrue(val);

const returnFalse = () => false;
const returnTrue = () => true;

const fnMaker = _.curry((condition, data, updater, fn) => {
  return (...args) => {
    if (condition(data)) {
      fn(...args);
    } else {
      data = updater(data);
    }
  };
});

export const callOnce = fnMaker(isFalse, true, returnFalse);
export const skipFirst = fnMaker(isTrue, false, returnTrue);

export const compose = (val, ...fns) =>
  fns.reduce((prev, current) => current(prev), val);

export const dropPayload = (state, {payload}) => dropCollectionById(state, payload);
export const dropMeta = (state, {meta}) => dropCollectionById(state, meta);


