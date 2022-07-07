// yarn add node-fetch -S
// yarn add babel-cli -S

import fetch from 'node-fetch';

const args = process.argv.slice(2)

console.log(args[1] + " repo size:");

fetch('https://api.github.com/repos/' + args[0] + '/' + args[1])
    .then(v => v.json()).then((v) => {
    const msize = (v['size'] / 1024).toFixed(2)
    const gsize = (v['size'] / 1024 / 1024).toFixed(2)
    console.log(msize + 'MB');
    console.log(gsize + 'GB');



    console.log("finish.");
})
    .catch(err => console.log(err));

