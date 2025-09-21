import { useEffect, useState } from 'react';
const API_URL =
  'http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ordermarket_cap_desc&per_page=10&page=1&sparkline=false';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new error('Faild to fetch coins');
        }
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div>
      <h1>h Crypto Dash</h1>
    </div>
  );
};

export default App;
