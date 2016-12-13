'use strict';

var webpack = require('webpack');

var fs = require('fs');

var envConfig = require('./config');

function hasArg(arg) {
  var regex = new RegExp('^' + ((arg.length === 2) ? ('-\\w*'+arg[1]+'\\w*') : (arg)) + '$');
  return process.argv.filter(regex.test.bind(regex)).length > 0;
}

var SRC_PATH = __dirname + '/src';
var BUILD_PATH = __dirname + '/dist/';

var ROOT_PATH = __dirname;

// default NODE_ENV to production unless -d or --debug is specified
var NODE_ENV = process.env['NODE_ENV'] ||
  (hasArg('-d') ||
  (hasArg('--debug')) ? 'development': 'production');

console.log('webpack env:', NODE_ENV);

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_HOST: JSON.stringify(envConfig.api_host)
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity // (with more entries, this ensures that no other module goes into the vendor chunk)
  })
];

var output = {
  path: BUILD_PATH,
  filename: '[name].bundle.js'
};

if (NODE_ENV === 'production') {
  output.publicPath = '/static/script/';

  plugins.push(new webpack.optimize.UglifyJsPlugin({
    test: /app.bundle.js/i,
    mangle: false,
    compress: {
      warnings: false
    }
  }));
}



var config = module.exports = {
  context: SRC_PATH,

  // output a bundle for the app JS and a bundle for styles
  // eventually we should have multiple (single file) entry points for various pieces of the app to enable code splitting
  entry: {
    vendor: './vendor',
    app: './app.js'
  },

  output: output,

  module: {
    loaders: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        stage: 0
      }
    }, {
      test:   /\.scss$/,
      loader: 'style!css!postcss!sass'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js',],
    alias: {
      // angular
      'angular-route':          ROOT_PATH + '/node_modules/angular-route/angular-route.min.js',
      'angular-messages':       ROOT_PATH + '/node_modules/angular-messages/angular-messages.min.js',
      'angular-animate':        ROOT_PATH + '/node_modules/angular-animate/angular-animate.min.js',
      'angular-aria':           ROOT_PATH + '/node_modules/angular-aria/angular-aria.min.js',
      'angular-material':       ROOT_PATH + '/node_modules/angular-material/angular-material.min.js',
      'angular-material-style': ROOT_PATH + '/node_modules/angular-material/angular-material.scss',
      'font-awesome':           ROOT_PATH + '/node_modules/font-awesome/scss/font-awesome.scss',
      'angular-sanitize':       ROOT_PATH + '/local_lib/textAngular-sanitize.js',
    }
  },

  plugins: plugins
};


// development environment:
if (NODE_ENV === 'development') {
  // replace minified files with un-minified versions
  for (var name in config.resolve.alias) {
    var minified = config.resolve.alias[name];
    var unminified = minified.replace(/[.-\/]min\b/g, '');

    if (minified !== unminified && fs.existsSync(unminified)) {
      config.resolve.alias[name] = unminified;
    }
  }
}
