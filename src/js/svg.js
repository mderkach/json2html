// import all svg
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../assets/svg/', true, /\.svg$/));

console.log('svg sprite ready');
