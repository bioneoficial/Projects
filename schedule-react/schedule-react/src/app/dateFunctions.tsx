export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/*export function getToday() {
  return "2021-06-17";
}*/
export function getToday() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
  let tToday = yyyy + '-' + mm + '-' + dd;
  return String(tToday);
}

export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split("-");
  return `${MONTHS[parseInt(month) - 1]} of ${year}`;
}

export function addMonths(month: string, increment: number) {
  const jsDate = new Date(month + "-01T12:00:00");
  jsDate.setMonth(jsDate.getMonth() + increment);
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, "0")}`;
}
