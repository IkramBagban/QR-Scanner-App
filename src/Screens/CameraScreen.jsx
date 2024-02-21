import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { useIsFocused } from '@react-navigation/native'
import { useQRCodeContext } from '../Context/ContextProvider'

const CameraScreen = ({ navigation }) => {
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
        enableZoomGesture={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraScreen;