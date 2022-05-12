import fs from 'node:fs';
import https from 'node:https';
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

const urlImages = images.slice(0, 10);

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

// step 4. looping through the array
for (let i = 0; i < urlImages.length; i++) {
  if (i < 10) {
    https
      .get(urlImages[i], (res) => {
        const imgPath = `./memes/0${i + 1}.jpg`;
        const stream = fs.createWriteStream(imgPath);

        res.pipe(stream);

        stream.on('finish', () => {
          stream.close();
          console.log('Image successfully downloaded');
        });
      })
      .on('error', (err) => {
        console.log(err);
      });
  }
}
