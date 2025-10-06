import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>The Page Does Not Exist</p>
      <Link to="/" style={styles.link}>
        🔙 Go Back
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAling: 'center',
    padding: '80px 20px',
    color: '#fff',
  },
  title: {
    fontsize: '72px',
    marginBottom: '20px',
  },
  message: {
    fontsize: '18px',
    marginBottom: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
};

export default NotFoundPage;
