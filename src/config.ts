/* eslint-disable prettier/prettier */
const ENDPOINT = 'https://api.twelvedata.com';

const API_KEY = 'your-api-key-here';

export default function fetchAPI(code) {
  let url = `${ENDPOINT}/time_series?symbol=${code}&interval=1min&apikey=${API_KEY}`;
  //console.log(url)

  return new Promise(async (resolve, reject) => {
    let res = await fetch(url);
    let return_res = {
      stockIndex: 0,
      stockChangeRaw: 0,
      stockChangePercent: 0,
    };
    if (res.status != 200) {
      resolve(return_res);
      return;
    }
    let obj = await res.json();
    //console.log(obj)
    if (obj.status != 'ok') {
      resolve(return_res);
      return;
    }
    return_res.stockIndex = parseFloat(obj.values[0].close);
    let pastIntervalIndex = parseFloat(obj.values[1].close);
    return_res.stockChangeRaw = return_res.stockIndex - pastIntervalIndex;
    return_res.stockChangePercent =
      (return_res.stockIndex / pastIntervalIndex - 1) * 100;
    resolve(return_res);
  });
}
