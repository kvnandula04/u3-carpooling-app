import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Email not verified');

  const handleSubmit = () => {
    if (!email.endsWith('@bath.ac.uk')) {
      setStatus('Invalid email');
      return;
    }

    setStatus('Email verification link sent');
    // code to send email verification link here

    // once the user clicks the verification link, call this function
    // to update the status
    const handleVerificationSuccess = () => {
      setStatus('Your email is verified');
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  button: {
    width: 100,
    height: 44,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default App;
