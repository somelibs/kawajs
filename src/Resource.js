import _ from 'lodash';
import Smart from './Smart';
import ResourceCall from './internal/ResourceCall';
import resolve from './helpers/resolve';

class Resource extends Smart {

  _contextParser(resolver, context) {
    return {
      ...context,
      schema: resolver('schema') || {},
      mock: resolver('mock', false) || false,
      path: resolver('path', false),
      baseUri: resolver('baseUri', false),
      method: resolver('method') || 'GET',
      paginate: resolver('paginate') || false,
      allowCors: resolver('allowCors') || false,
      credentials: resolver('credentials') || 'same-origin',
      reader: resolver('reader') || 'json',
      headers: resolver('headers', false),
      collection: resolver('collection') || false,
      entityParser: resolver('entityParser', false) || false,
      payloadParser: resolver('payloadParser', false) || false,
      errorParser: resolver('errorParser', false) || ((payload) => payload),
      responseParser: resolver('responseParser', false) || ((response, body) => body),
      requestTransform: resolver('requestTransform') === false ? false : _.snakeCase,
      responseTransform: resolver('responseTransform') === false ? false : _.camelCase,
      resourceClass: this.constructor.name || 'Resource',
      onSuccess: resolver('onSuccess', false) || false,
      onError: resolver('onError', false) || false,
      hook: resolver('hook', false) || false,
    };
  }

  _getResolver = (payload, context) => (key, call = true) => {
    const resolver = call ? resolve : (value) => value;
    const option = resolver(context[key]);
    if (option || option === false) return option;
    return resolver.call(this, this.static[key], { ...context, payload });
  };

  define(base) {
    return ({ payload, ...options } = {}) => {
      const mergedOptions = { ...base, ...options };
      const resolver = this._getResolver(payload, mergedOptions);
      const context = this._contextParser(resolver, mergedOptions);
      const resourceCall = ResourceCall.export(context);
      return resourceCall(payload);
    };
  }

  static export(...args) {
    return new this(...args);
  }

}

export { ResourceCall };
export default Resource;
