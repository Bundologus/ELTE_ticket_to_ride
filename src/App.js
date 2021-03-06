import { Provider } from 'react-redux';
import './App.css';
import { store } from './state/store';
import { Layout } from './views/layout/Layout';
import './api/initialize';

function App() {
  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  );
}

export default App;
