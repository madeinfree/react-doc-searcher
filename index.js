const clipboardy = require('clipboardy');
const open = require('open');
const keypress = require('keypress');
const chalk = require('chalk');

function openWeb(key) {
  console.log(chalk.green(`搜尋 '${key}' - Search '${key}'`));
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
let disable = false;

keypress(process.stdin);
process.stdin.on('keypress', (_, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit(1);
  }
  if (key.name === 'o') {
    disable = !disable;
    if (!disable) {
      console.log(chalk.green('啟用搜索 - Enable Search'));
    } else {
      console.log(chalk.grey('關閉搜索 - Disable Search'));
    }
  }
});
process.stdin.setRawMode(true);
process.stdin.resume();

function worker() {
  setTimeout(() => {
    const new_clipboardy = clipboardy.readSync();
    if (last_clipboardy !== new_clipboardy) {
      last_clipboardy = new_clipboardy;
      if (!disable) openWeb(new_clipboardy);
    }
    worker();
  }, 500);
}

function runBin() {
  if (the_first) {
    last_clipboardy = clipboardy.readSync();
    worker();
    the_first = false;
    console.log(
      chalk.yellow('Wait for copy anything and Press Ctrl + C to exit process.')
    );
  }
}

module.exports = {
  runBin
};
