window.process = {
    env: {
      NODE_ENV: 'development'
    }
  };
  function importFile(content) {
    return "data:text/javascript;base64," + btoa(content);
  }

  const nodeModules = document.currentScript.src + '/../../node_modules/';
  const config_path = document.currentScript.src + '/../config/';

  const react = {
    'prop-types'               : nodeModules + 'react-es6/prop-types/index.js',
    'tiny-warning'             : nodeModules + 'react-es6/tiny-warning.mjs',
    'tiny-invariant'           : nodeModules + 'react-es6/tiny-invariant.mjs',
    'mini-create-react-context': nodeModules + 'react-router/node_modules/mini-create-react-context/dist/esm/index.js',
    'path-to-regexp'           : nodeModules + 'react-es6/path-to-regexp.mjs',
    'react-is'                 : nodeModules + 'react-es6/react-is.mjs',
    'hoist-non-react-statics'  : nodeModules + 'react-es6/hoist-non-react-statics.mjs',
    'resolve-pathname'         : nodeModules + 'react-es6/resolve-pathname.mjs',
    'isarray'                  : nodeModules + 'react-es6/isarray.mjs',
  };
  const reactMin = {
    ...react,
    'react'           : nodeModules + 'react-es6/build/react.min.mjs',
    'react-dom'       : nodeModules + 'react-es6/build/react-dom.min.mjs',
    'react-dom/client': nodeModules + 'react-es6/build/react-dom-client.min.mjs',
  };
  const config = {
    'data_participants' : config_path + 'data_participants.js',
    'data_songs' : config_path + 'data_songs.js',
    'settings' : config_path + 'settings.js',
  }

  const imports = {
    'animejs'  : nodeModules + 'animejs/lib/anime.es.js',
    ...config,
    ...reactMin
  };
  const importmap = document.createElement('script');
  importmap.type = 'importmap';
  importmap.textContent = JSON.stringify({ imports });
  let node = document.body;
  if (!node) {
      node = document.head;
  }
  if (!node) {
      console.error('importmap.js> make sure to either have a <HEAD> or <BODY> before you include this file.');
  } else {
      node.appendChild(importmap);
  }