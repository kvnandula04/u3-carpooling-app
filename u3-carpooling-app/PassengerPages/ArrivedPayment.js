import React,  {useState, useEffect} from 'react';
import { 
    Button, View, SafeAreaView, Text, ScrollView, StyleSheet, Dimensions
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {useNavigation} from '@react-navigation/native';



export default function ArrivedPayment(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        //think this is where we will store the journey
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const navigation = useNavigation();
    return(
        <>
        <ScrollView>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Button style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
              onPress={() => navigation.navigate('FirstPage')}
              colour = "green"
              title="Go to FirstPage" 
          />
        <SafeAreaView>
          <View>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{height: 500, width: Dimensions.get("window").width}}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </View>
        </SafeAreaView>
        </ScrollView>
      </>
    );

  
}
