import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// A bundle served by a second server (remote-server.js), not by this app's dev server.
const REMOTE_BUNDLE_URL = 'http://localhost:8082/remote.bundle';

export default function App() {
  const [status, setStatus] = useState('loading the remote bundle');

  useEffect(() => {
    // The loader Expo installs for `import()`. Federation loaders call it with an absolute URL.
    globalThis
      .__loadBundleAsync(REMOTE_BUNDLE_URL)
      .then(() => setStatus(`loaded: ${globalThis.__REMOTE_BUNDLE__}`))
      .catch((error) => setStatus(`failed: ${error.message}`));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
