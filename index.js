const puppeteer = require('puppeteer');

let browser;
let page;

async function main() {
  // Open the browser
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();

  // Get the distance
  let distance, time;
  let from = [
    'Belo Horizonte',
    'Belo Horizonte',
    'Juiz de Fora',
    'Ouro Branco',
    'Congonhas'
  ],
    to = [
      'Juiz de Fora',
      'Uberlandia',
      'Rio de Janeiro',
      'Belo Horizonte',
      'Belo Horizonte'
    ];

  for (let i = 0; i < from.length; i++) {
    [distance, time] = await getDistanceAndTime(from[i], to[i]);
    console.log('Distance between ' + from[i] + ' and ' + to[i] + ': ' + distance + '.\nTravel duration estimative: ' + time + '.');
  }

  await browser.close();

}

async function getDistanceAndTime(to, from) {

  let url = 'https://www.google.com/maps/dir/' + to.split(' ').join('+') + '/' + from.split(' ').join('+');

  await page.goto(url);
  let distance = (await page.$x("//div[text()[contains(.,'km')]]"))[0];
  let parent = (await (await distance.getProperty("parentNode")).getProperty("parentNode"));
  let time = (await parent.$$("div"))[0];

  return [await page.evaluate(el => el.innerText, distance), await page.evaluate(el => el.innerText, time)];
};

main();
