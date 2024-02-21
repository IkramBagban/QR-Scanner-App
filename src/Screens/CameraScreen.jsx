import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { useIsFocused } from '@react-navigation/native'
import { useQRCodeContext } from '../Context/ContextProvider'
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const CameraScreen = ({ navigation }) => {
    const [torch, setTorch] = useState(false)
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()

    const qrCtx = useQRCodeContext()

    const isFocused = useIsFocused();
    const [isScanning, setIsScanning] = useState(false);


    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {

            if (isScanning) return;
            setIsScanning(true);

            const code = codes[0];
            if (code?.value == null) return;

            navigation.navigate('Data', { qrDetail: codes[0] });
            setTimeout(() => setIsScanning(false), 3000);
        }
    })



    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [])


    if (!hasPermission) return <View><Text>DEVICE NULL</Text></View>;
    return (
        <View style={styles.container}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isFocused}
            codeScanner={codeScanner}
            torch={torch ? 'on' : 'off'}
            enableZoomGesture={true}
          />
    
          <TouchableOpacity 
            style={styles.torchButton} 
            onPress={() => setTorch(!torch)} 
            disabledOpacity={0.4}
          >
            <Ionicons 
              name={torch ? 'flash-off' : 'flash'} 
              color="white" 
              size={24} 
            />
            <Text style={styles.torchText}>{torch ? 'Turn Off' : 'Turn On'}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      torchButton: {
        position: 'absolute',
        top: 40, 
        right: 20, 
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      torchText: {
        color: '#FFFFFF',
        marginTop: 4,
      },
    });
    
    export default CameraScreen;