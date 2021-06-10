export default function Report({ children: report }) {
  const month = report.month;
  const year = report.year;
  const value = parseFloat(report.value).toFixed(2);
  const percent = parseFloat(report.percent).toFixed(2);
  const sPercent = percent > 0 ? '+' + percent : percent;
  const divStyle =
    'hover:bg-pink-300  flex flex-row border-b border-gray-300 items-center';
  const textColor =
    percent > 0 ? 'text-green-700' : percent < 0 ? 'text-red-700' : '';
  const months = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];

  return (
    <div className={divStyle}>
      <p className="mr-5 text-sm font-mono">
        {months[month - 1]}/{year}
      </p>
      <p className={textColor}>R$ {value}</p>
      <p className={'ml-auto text-sm font-semibold ' + textColor}>
        {sPercent}%
      </p>
    </div>
  );
}
