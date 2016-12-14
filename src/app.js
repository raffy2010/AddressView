import 'babel-polyfill';

import _ from 'lodash';

import addressModule from './address';

import ngRedux from 'ng-redux';

import reduxPromise from './reduxPromise';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import address from './address/reducer';

import '../style/app.scss';

let defaultHost = process.env['API_HOST'],
    isDev = process.env['NODE_ENV'] == 'development';

let AddressView = angular.module('addressView', [
  // deps
  'ngAnimate',
  'ngMessages',
  'ngRoute',
  'ngMaterial',
  //'ngSanitize',
  'angular-clipboard',
  'angular-web-notification',
  ngRedux,

  // domain
  addressModule.name
]).config((
  $ngReduxProvider,
  $routeProvider,
  $provide,
  $httpProvider,
  $compileProvider
) => {
  $routeProvider.otherwise({
    redirectTo: '/address'
  });

  let middlewares = [reduxThunk, reduxPromise, createLogger()];

  let enhancers = window.devToolsExtension ?
    [window.devToolsExtension()] :
    [];

  $ngReduxProvider.createStoreWith({
    address
  }, middlewares, enhancers);


  if (isDev) {
    $compileProvider.debugInfoEnabled(false);
  }

  $provide.factory('addressViewHttpInterceptor', ['$q', $q => ({
    request: (config) => {
      if ((config.method === 'GET' && /^.*\.(html|svg)$/.test(config.url)) ||
        config.url[0] !== '/'
      ) {
        return config;

      } else {
        config.url = defaultHost + config.url;

        config.withCredentials = true;

        return config;
      }
    },
    response: (response) => {
      let data,
          method = response.config.method.toUpperCase();

      if (['POST', 'POST', 'DELETE'].indexOf(method) > -1) {
        if (data = response.data) {
          if (data.success == 1) {
            return data.data;
          } else if (data.success == 0) {
            return $q.reject(new Error(data.message || 'request error, please try again'));
          }

          return data;
        } else {
          return $q.reject(new Error('invalid response format'));
        }
      } else if (method === 'GET' && !/^.*\.(html|svg)$/.test(response.config.url)) {
        if (data = response.data) {
          if (data.success == 1) {
            return data.data;
          } else if (data.success == 0) {
            return $q.reject(new Error(data.message || 'request error, please try again'));
          }

          return data;
        } else {
          return response.data;
        }
      }

      return response;
    }
  })]);

  $httpProvider.interceptors.push('addressViewHttpInterceptor');
});
