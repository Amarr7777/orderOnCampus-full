import Navigation from './router/navigation';
import { Provider } from 'react-redux'
import { store } from './store';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_KEY = 'pk_test_51OZ4LlSFJsovVYEt5bHhvPeMaJAddfGYrQARQpxfSDEXZzef2sRKTlPp7Ex1Y4a6znQOk3hEIodFHCCibB1tn3wL00J1tckwQs'
export default function App() {

  return (

    <Provider store={store}>
      <StripeProvider publishableKey= {STRIPE_KEY}>
        <Navigation />
      </StripeProvider>
    </Provider>
  );
}


