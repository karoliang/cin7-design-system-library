import {Link, AccountConnection} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AccountConnectionExample() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'john.smith@merchantstore.com' : '';

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, []);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Merchant Hub's{' '}
      <Link url="https://merchanthub.com/terms">terms and conditions</Link>. You'll pay a
      commission rate of 2.9% on sales made through Merchant Hub.
    </p>
  );

  return (
    <AccountConnection
      accountName={accountName}
      connected={connected}
      title="Merchant Hub"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
    />
  );
}

export default withPolarisExample(AccountConnectionExample);