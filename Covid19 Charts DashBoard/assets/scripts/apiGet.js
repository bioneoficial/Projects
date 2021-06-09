let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
const params = {
  method: 'GET',
  mode: 'no-cors',
  headers: headers,
};

const covidApi = axios.create({
  baseURL: 'https://api.covid19api.com/',
  headers: params,
});

async function getTotalData() {
  const response = await covidApi.get('summary');

  const global = response.data.Global;
  const countries = getCountries(response.data.Countries);
  const countriesNames = {
    names: _.map(response.data.Countries, 'Country'),
    slug: _.map(response.data.Countries, 'Slug'),
  };
  return { global, countries, countriesNames };
}

function getCountries(countriesArray) {
  let countries = countriesArray;
  let topCountries = _.orderBy(countries, 'TotalDeaths', 'desc');
  return _.filter(topCountries, (el, i) => {
    if (i < 10) return true;
  });
}

async function getFilteredData(inicialDate, finalDate, country, filter) {
  const endPoint = `country/${country}?from=${inicialDate}T00:00:00Z&to=${finalDate}T00:00:00Z`;
  const response = await covidApi.get(endPoint);

  let data = [];
  let media = [];
  _.forEach(response.data, (el, i, arr) => {
    if (i > 0) {
      let diff = el[filter] - arr[i - 1][filter];
      let date = dateFns.addHours(el.Date, 3);
      data.push({ [filter]: diff, Date: dateFns.format(date, 'DD-MM-YYYY') });
    }
  });
  let tmp = parseInt(_.meanBy(data, filter));
  _.forEach(data, el => {
    media.push(tmp);
  });

  return { filtered: data, last: _.last(response.data), media: media };
}
