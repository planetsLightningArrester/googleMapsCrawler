const puppeteer = require('puppeteer');

let browser;
let page;

async function main() {
  //Open the browser
  browser = await puppeteer.launch();
  page = await browser.newPage();

  //Get the distance
  let distance, time;
  let origem = [
    'Belo Horizonte',
    'Belo Horizonte',
    'Juiz de Fora',
    'Ouro Branco',
    'Congonhas'
  ],
  destino = [
    'Juiz de Fora',
    'Uberlandia',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Belo Horizonte'
  ];

  for (let i = 0; i < origem.length; i++) {
    [distance, time] = await getDistanceAndTime(origem[i], destino[i]);
    console.log('Distância entre ' + origem[i] + ' e ' + destino[i] + ': ' + distance + '.\nPrevisão de tempo de viagem: ' + time + '.');
  }
  
  // origem = "Belo Horizonte";
  // destino = "Juiz de Fora";
  // [distance, time] = await getDistanceAndTime(origem, destino);
  // console.log('Distância entre BH e JF: ' + distance + '.\n Previsão de tempo de viagem: ' + time + '.');

  // origem = "Belo Horizonte";
  // destino = "Uberlandia";
  // [distance, time] = await getDistanceAndTime(origem, destino);
  // console.log('Distância entre BH e JF: ' + distance + '.\n Previsão de tempo de viagem: ' + time + '.');
  await browser.close();

}

async function getDistanceAndTime(to, from) {

  let url = 'https://www.google.com/maps/dir/' + to.split(' ').join('+') + '/' + from.split(' ').join('+');

  await page.goto(url);
  let distance = await page.$$eval('#section-directions-trip-0 > div.section-directions-trip-description > div:nth-child(1) > div.section-directions-trip-numbers > div.section-directions-trip-distance.section-directions-trip-secondary-text > div', element => element.map(el => el.textContent));
  let time = await page.$$eval('#section-directions-trip-0 > div.section-directions-trip-description > div:nth-child(1) > div.section-directions-trip-numbers > div.section-directions-trip-duration.delay-light > span:nth-child(1)', element => element.map(el => el.textContent));
  
  return [distance[0], time[0]];
};

main();

// #section-directions-trip-0 > div.section-directions-trip-description > div:nth-child(1) > div.section-directions-trip-numbers > div.section-directions-trip-duration.delay-light > span:nth-child(1)