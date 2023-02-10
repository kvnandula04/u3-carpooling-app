import React,  {useState, useEffect, useRef} from 'react';
import { 
    Button, View, SafeAreaView, Text, ScrollView, TextInput
} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function GenerateQRPage(){
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
          </SafeAreaView>
        </ScrollView>
      </>
    );

  
}
