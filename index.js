const clipboardy = require('clipboardy');
const open = require('open');

function openWeb(key) {
  switch (key) {
    case 'react':
    case 'React':
      return open('https://reactjs.org/');
    case 'React.Component':
    case 'Component':
      return open('https://reactjs.org/docs/react-component.html');
    case 'render':
      return open('https://reactjs.org/docs/react-component.html#render');
    case 'componentDidMount':
      return open(
        'https://reactjs.org/docs/react-component.html#componentdidmount'
      );
    case 'componentDidUpdate':
      return open(
        'https://reactjs.org/docs/react-component.html#componentdidupdate'
      );
    case 'componentWillUnmount':
      return open(
        'https://reactjs.org/docs/react-component.html#componentwillunmount'
      );
    case 'getDerivedStateFromProps':
      return open(
        'https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops'
      );
    case 'componentDidCatch':
      return open(
        'https://reactjs.org/docs/react-component.html#componentdidcatch'
      );
    case 'setState':
      return open('https://reactjs.org/docs/react-component.html#setstate');
  }
  if (key[0] === 'u' && key[1] === 's' && key[2] === 'e') {
    return open(
      `https://reactjs.org/docs/hooks-reference.html#${key.toLowerCase()}`
    );
  }
  open(`https://google.com/search?q=${key}`);
}

let last_clipboardy = '';
let the_first = true;

function worker() {
  setTimeout(() => {
    const new_clipboardy = clipboardy.readSync();
    if (last_clipboardy !== new_clipboardy) {
      last_clipboardy = new_clipboardy;
      openWeb(new_clipboardy);
    }
    worker();
  }, 500);
}

function runBin() {
  if (the_first) {
    last_clipboardy = clipboardy.readSync();
    worker();
    the_first = false;
    console.log('Wait for copy anything...');
  }
}

module.exports = {
  runBin
};
