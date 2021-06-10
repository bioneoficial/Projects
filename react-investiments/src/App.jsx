import Header from './components/Header';
import Investment from './components/Investment';
import { Investments } from './data/Investments';

export default function App() {
  const investments = Investments.investments;
  const reports = Investments.reports;

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        {investments.map(inv => {
          const invReports = reports.filter(rep => rep.investmentId === inv.id);

          return (
            <Investment key={inv.id} description={inv.description}>
              {invReports}
            </Investment>
          );
        })}
      </main>
    </>
  );
}
