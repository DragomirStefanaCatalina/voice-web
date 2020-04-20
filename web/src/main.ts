import 'focus-visible';
import * as React from 'react';
import { render } from 'react-dom';
import './components/index.css';
import { isMobileSafari } from './utility';

declare var require: any;

// Safari hack to allow :active styles.
document.addEventListener('touchstart', function() {}, true);

// Start the app when DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  const deferredPolyfills = [
    typeof window.IntersectionObserver === 'undefined'
      ? require('intersection-observer')
      : Promise.resolve(),
    typeof window.MediaRecorder === 'undefined' && isMobileSafari()
      ? require('audio-recorder-polyfill')
      : Promise.resolve(),
  ];
  const [_, AudioRecorder] = await Promise.all(deferredPolyfills);
  if (AudioRecorder) {
    alert('MediaRecorder polyfill loaded:');
    window.MediaRecorder = AudioRecorder.default;
    alert(typeof MediaRecorder);
  }
  const App = require('./components/app').default;
  render(React.createElement(App), document.getElementById('root'));
});
