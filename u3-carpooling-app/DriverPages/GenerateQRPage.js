import React,  {useState, useEffect, useRef} from 'react';
import { 
    Button, View, SafeAreaView, Text, ScrollView, TextInput
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import QRCode from "react-qr-code";
import Svg from 'react-native-svg';

export default function GenerateQRPage(){
    const navigation = useNavigation();
    const [url, setUrl] = useState("");
    function RenderOrNot(){
        if(url != ""){
            return(
              <QRCode id={"QRCode"} value={url} level={"L"}/>
            );
        }
    }

    return(
        <>
        <View style={{alignItems: "center", marginTop:50}}>
        <Button style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
              onPress={() => navigation.navigate('FirstPage')}
              colour = "green"
              title="Go to FirstPage" 
          />
          <Button style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
              onPress= {() => setUrl("https://www.yahoo.com")}//this is where we will put the paymentID for each driver
              title="Generate QRCode" 
          />
         <RenderOrNot />
         </View>
      </>
    );

  
}
