import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function TemporaryHomePage() {
  const navigation = useNavigation();
  return (
      <View>
         <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>U3</Text>
        <Button 
              onPress={() => navigation.navigate('ArrivedPayment')}
              title="Go to QRScanPage" 
          />
        <Button 
            onPress={() => navigation.navigate('GenerateQRPage')}
            title="Go to QrGenPage" 
        />
        <StatusBar style="auto" />
      </View>
  );
}