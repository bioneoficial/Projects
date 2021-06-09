let pieCanvas, barCanvas, lineCanvas;

(async function () {
  try {
    totalData = await getTotalData();
    kpiGlobalFill(totalData.global);
    generatePie(totalData.global);
    generateBar(totalData.countries);
    fillSelects(totalData.countriesNames);
    document.getElementById('home').addEventListener('click', switchPage);
    document.getElementById('pais').addEventListener('click', switchPage);
    document.getElementById('top5').addEventListener('click', switchPage);
    document.getElementById('btn-apply').addEventListener('click', applyFilter);
  } catch (error) {
    showErrorMessage(error, '.header_container');
  } finally {
    toggleModal();
  }
})();

function kpiGlobalFill(totalData) {
  let kpisP = document.querySelectorAll('#kpi p');
  let kpiInfos = [totalData.TotalConfirmed, totalData.TotalDeaths, totalData.TotalRecovered];
  kpisP.forEach((el, index) => {
    el.textContent = kpiInfos[index].toLocaleString('pt-BR');
  });
  document.getElementById('date-updated').innerText = 'Last update ' + dateFns.format(totalData.Date, 'DD/MM/YYYY HH:mm:ss');
}

function fillSelects(countriesList) {
  _.forEach(countriesList.names, (el, i) => {
    let opt = new Option(el, countriesList.slug[i], false, (el == 'Brazil') ? true : false);
    document.getElementById('countries-select').appendChild(opt);
  });
  document.getElementById('filter-select').appendChild(new Option('Confirmed', 'Confirmed', false, false));
  document.getElementById('filter-select').appendChild(new Option('Deaths', 'Deaths', false, true));
  document.getElementById('filter-select').appendChild(new Option('Recovered', 'Recovered', false, false));
}

function switchPage(event) {
  document.querySelector('.selected').classList.remove('selected');
  this.classList.add('selected');

  if (this.id == 'pais') {
    document.getElementById('resume').style.display = 'none';
    document.getElementById('kpi2').style.display = 'flex';
    document.getElementById('resume2').style.display = 'flex';
    document.querySelector('aside').style.display = 'flex';
  }
  else if (this.id == 'home') {
    document.getElementById('resume').style.display = 'grid';
    document.querySelector('aside').style.display = 'none';
    document.getElementById('resume2').style.display = 'none';
    document.getElementById('kpi2').style.display = 'none';
  }
}

function toggleModal() {
  document.querySelector('.load-modal').classList.toggle('load-modal--active');
}

async function applyFilter() {
  if (lineCanvas) lineCanvas.destroy();
  toggleModal();
  try {
    let iDate = dateFns.subDays(document.getElementById('inicial-date').value, 1);
    let formattedIDate = dateFns.format(iDate, 'YYYY-MM-DD');
    let fDate = document.getElementById('final-date').value;
    let country = document.getElementById('countries-select').value;
    let filter = document.getElementById('filter-select').value;
    filteredData = await getFilteredData(formattedIDate, fDate, country, filter)
    generateLine(filteredData.filtered, filter, filteredData.media);
    document.querySelector('#kpi2 .confirmeds p').textContent = filteredData.last.Confirmed.toLocaleString('pt-BR');
    document.querySelector('#kpi2 .deaths p').textContent = filteredData.last.Deaths.toLocaleString('pt-BR');
    document.querySelector('#kpi2 .recovereds p').textContent = filteredData.last.Recovered.toLocaleString('pt-BR');
  } catch (error) {
    showErrorMessage(error, 'aside');
  }
  finally {
    toggleModal();
  }
}

function showErrorMessage(err, parentEl) {
  let label = document.createElement('label');
  label.classList.add('error-message');
  label.textContent = err;
  document.querySelector(parentEl).appendChild(label);
  setTimeout(() => {
    document.querySelector('.error-message').remove();
  }, 5000);
  // loadSummaryAndCountries();
}