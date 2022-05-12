import fs from 'node:fs';
// import https from 'node:https';
import fetch from 'node-fetch';

// Step 1. Fetch url
const resp = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const url = await resp.text();

console.log(url);

// Step 2. extract first 10 images
let image;
const images = [];
const urlString = url;
const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ((image = rex.exec(urlString))) {
  images.push(image[1]);
}

// const urlImgaes = images.slice(0, 10);

// step 3. create new memes directory
const path = './memes';

fs.access(path, (error) => {
  if (error) {
    fs.mkdir(path, (errorOne) => {
      if (errorOne) {
        console.log(errorOne);
      } else {
        console.log('New directory created');
      }
    });
  } else {
    console.log('Error: existing directory. Change new directory name');
  }
});
