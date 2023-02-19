import { Image, StyleSheet, Text, TouchableOpacity, View, Button, Linking, Dimensions} from 'react-native'
import { useFonts } from 'expo-font'
import React,  {useState, useEffect, useCallback} from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {useNavigation} from '@react-navigation/native';




export default function ArrivedPayment(){
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setShow(false);
        Linking.openURL(data);//opens to payment page
        setScanned(false);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const navigation = useNavigation();

    function ShowScanner(){
        if (show){
            return(
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{height: 500, width: Dimensions.get("window").width}}
            />
            );
        }
    }
    function ShowButton(){
        if(!show){
            return(<TouchableOpacity onPress={() => setShow(true)}>
                <View style={styles.touchableContainer}>
                    <Text style={styles.font}>scan Driver's QR code.</Text>
                </View>
                <Image style={styles.image} source={require('../assets/scan.png')}/>
            </TouchableOpacity>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Button style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}
                    onPress={() => navigation.navigate('FirstPage')}
                    colour = "green"
                    title="Go to FirstPage" 
                />
            <View>
                <ShowButton/>
                <ShowScanner/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: "center", 
        marginTop:50
    },
    touchableContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 260,
        height: 240,
        
        backgroundColor: '#F7F3EB',
        borderColor: "3F3F3F",
        borderRadius: 32,
        borderWidth: 5,

        padding: 0,
        margin: 0,
    },
    font: {
        padding: 0,
        marginLeft: -30,
        fontFamily: "AtkinsonHyperlegible",
        fontSize: 28,
        lineHeight: 50,
        alignSelf: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
        width: 180,
        height: 220,
    },
    image: {
        position: 'absolute',
        left: 155,
        top: 125,
    }
});