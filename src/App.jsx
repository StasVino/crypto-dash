import { useEffect, useState } from 'react';
import CoingCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';
import SortSelector from './components/SortSelector';
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

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

  const filteredCoins = coins
    .filter((coins) => {
      return (
        coins.name.toLowerCase().includes(filter.toLowerCase()) ||
        coins.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_precentage_24h - a.price_change_precentage_24h;
        case 'change_asc':
          return a.price_change_precentage_24h - b.price_change_precentage_24h;
      }
    });

  return (
    <div>
      <h1>h Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
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
