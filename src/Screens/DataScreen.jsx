import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useQRCodeContext } from '../Context/ContextProvider';
import { darkTheme, lightTheme } from '../theme';
import { useTheme } from '../Context/ThemeProvider';
import QRCodeComponent from '../components/QRCode';


const DataScreen = ({ route, navigation }) => {
  const { addData } = useQRCodeContext();
  const { qrDetail, isSaved } = route.params;

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleSaveQR = () => {
    Alert.alert('Save QR', 'Do You Want To Save This QR', [
      { text: "No", onPress: () => { } },
      {
        text: "Yes", onPress: () => {
          addData(qrDetail);
          navigation.navigate('SavedQr')
        }
      },
    ]);
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ marginBottom: 20 }}>
          <QRCodeComponent value={qrDetail.value} size={200} />
        </View>
        <View style={[styles.detailsContainer, { backgroundColor: theme.header }]}>
          <Text style={[styles.detailText, { color: theme.text }]}>{qrDetail.value}</Text>
        </View>
      </ScrollView>
      {!isSaved && <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: theme.primary }]}
        onPress={handleSaveQR}
      >
        <Text style={[styles.saveButtonText]}>Save QR</Text>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',

    borderRadius: 8,
    padding: 20,
    alignItems: 'flex-start',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  saveButton: {
    width: '100%',
    borderRadius: 25,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
});


export default DataScreen;