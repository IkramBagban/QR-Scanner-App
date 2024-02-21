import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';


const QRCodeComponent = ({value, size}) => {
    return (
        <View style={styles.qrCodeContainer}>
            <QRCode value={value} size={size} />
        </View>
    )
}


const styles = StyleSheet.create({
    qrCodeContainer: {
        backgroundColor: 'white',
        elevation: 4,
        padding: 10,
        borderRadius: 8,
        
    },
})
export default QRCodeComponent