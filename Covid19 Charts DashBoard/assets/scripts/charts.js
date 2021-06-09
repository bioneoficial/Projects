function generatePie(totalData) {
  new Chart(document.querySelector('#pie canvas'), {
    type: 'pie',
    data: {
      labels: ['Confirmed', 'Recovered', 'Deaths'],
      datasets: [
        {
          label: 'Covid',
          data: [totalData.TotalConfirmed, totalData.TotalRecovered, totalData.TotalDeaths],
          backgroundColor: ['#377eb8dd', '#4daf4add', '#e41a1cdd'],
          borderColor: 'rgba(255, 255, 255, 0.3)',
          hoverOffset: 8,
          hoverBackgroundColor: ['#377eb8', '#4daf4a', '#e41a1c']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Covid-19 Case Distribution',
          font: {
            size: 24
          }
        }
      },
      layout: {
        padding: 15,
        align: 'center'
      }
    }
  });
}

function generateBar(cData) {
  new Chart(document.querySelector('#bar canvas'), {
    type: 'bar',
    data: {
      labels: _.map(cData, 'Country'),
      datasets: [
        {
          data: _.map(cData, 'TotalDeaths'),
          label: 'Total Deaths',
          backgroundColor: '#ff7f00'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          postion: 'top'
        },
        title: {
          display: true,
          text: 'Total Deaths by Country - Top 10',
          font: {
            size: 24
          }
        }
      },
      layout: {
        padding: {
          top: 20,
          left: 100,
          bottom: 40,
          right: 100
        },
        align: 'center'
      }
    }
  })
}

function generateLine(cData, filter, media) {
  let txt = (filter == 'Confirmed') ? 'Confirmados' : (filter == 'Deaths') ? 'Óbitos' : 'Recuperados';
  let lineGraphic = new Chart(document.querySelector('#line canvas'), {
    type: 'line',
    data: {
      labels: _.map(cData, 'Date'),
      datasets: [
        {
          data: _.map(cData, filter),
          label: 'Numero de ' + txt,
          backgroundColor: '#e41a1c',
          borderColor: '#e41a1c88'
        },
        {
          data: media,
          label: 'Média de ' + txt,
          backgroundColor: '#7570b3',
          borderColor: '#7570b388'
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          postion: 'top'
        },
        title: {
          display: true,
          text: 'Covid-19 Daily Curve',
          font: {
            size: 24
          }
        }
      },
      layout: {
        padding: 10,
        align: 'center'
      }
    }
  });
  lineCanvas = lineGraphic;
}