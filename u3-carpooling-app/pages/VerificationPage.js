import React, { useState } from 'react';
import { View, Text, Button, WebView, StyleSheet } from 'react-native';

const VerificationPage = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  const handleNavigationStateChange = (webViewState) => {
    if (webViewState.url.includes('auth.bath.ac.uk')) {
      setLoggedIn(true);
      setShowWebView(false);
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      {!showWebView ? (
        <View>
          <Text>Not Logged In</Text>
          <Button
            title="Sign In"
            onPress={() => setShowWebView(true)}
          />
        </View>
      ) : error ? (
        <View>
          <Text>Login Not Successful</Text>
        </View>
      ) : loggedIn ? (
        <View>
          <Text>Logged In</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: 'https://auth.bath.ac.uk/login' }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default VerificationPage;
