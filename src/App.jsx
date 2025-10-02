import { useEffect, useState } from 'react';
import CoingCard from './components/CoinCard';
import LimitSelector from './components/LImitSelector';
import FilterInput from './components/FilterInput';
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&ordermarket_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) {
          throw new error('Faild to fetch coins');
        }
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  const filteredCoins = coins.filter((coins) => {
    return (
      coins.name.toLowerCase().includes(filter.toLowerCase()) ||
      coins.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      <h1>h Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoingCard key={coin.key} coin={coin} />
            ))
          ) : (
            <p>No matching coins found</p>
          )}
        </main>
      )}
    </div>
  );
};

export default App;
