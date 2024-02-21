import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useQRCodeContext } from '../Context/ContextProvider';
import { darkTheme, lightTheme } from '../theme';
import { useTheme } from '../Context/ThemeProvider';
import QRCodeComponent from '../components/QRCode';
import { useNavigation } from '@react-navigation/native';

const RenderItem = ({ item, deleteData, theme }) => {

  const navigation = useNavigation()
  const detailClickHandler = () => {
    navigation.navigate('Data', { qrDetail: item, isSaved: true });
  }

  const deleteQR = () => {
    Alert.alert('Delete QR', 'Do You Want To Delete This QR', [
      { text: "No", onPress: () => { } },
      {
        text: "Yes", onPress: () => {
          deleteData(item.id)
        }
      },
    ]);
  }
  return (
    <View style={[styles.itemContainer, { backgroundColor: theme.cardBackground }]}>

      <TouchableOpacity style={{
        alignItems: 'center',
        padding: 10,
      }} onPress={detailClickHandler}>

        <QRCodeComponent value={item.value} size={150} />
        <Text style={[styles.itemText, { color: theme.text }]}>{item?.value.length < 120 ? item?.value : item?.value.slice(0, 80) + "..."}</Text>

      </TouchableOpacity>
      <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme.primary }]} onPress={deleteQR}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const SavedQr = () => {
  const { scannedHistory, deleteData } = useQRCodeContext();

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {
        scannedHistory.length > 0 ? (
          <FlatList
            data={scannedHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RenderItem item={item} deleteData={deleteData} theme={theme} />}
          />
        ) : (
          <View style={{flex : 1, justifyContent :'center', alignItems : 'center'}}>
            <Text style={{ color: theme.text , fontWeight : 'bold'}}> No Saved QR Codes</Text>
          </View>
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 8,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SavedQr;
