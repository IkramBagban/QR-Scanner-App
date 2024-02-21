import React, { createContext, useState, useContext } from 'react';

export const QRCodeContext = createContext({
    scannedHistory: [],
    onAddData: (data) => { },
    onDeleteData: (id) => { },
});

const QRCodeProvider = ({ children }) => {
    const [scannedHistory, setScannedHistory] = useState([]);

    const addData = (data) => {
        // console.log('-----------------')
        // console.log('data', data)
        const updatedDataWithId = {
            ...data,
            id: Date.now(),
        };
        setScannedHistory((prevData) => [updatedDataWithId, ...prevData]);

        // console.log('updatedDataWithId', updatedDataWithId)
    };

    const deleteData = (id) => {
        setScannedHistory((prevData) => prevData.filter((data) => data.id !== id));
    };

    return (
        <QRCodeContext.Provider value={{ scannedHistory, addData, deleteData }}>
            {children}
        </QRCodeContext.Provider>
    );
};

export const useQRCodeContext = () => useContext(QRCodeContext);

export default QRCodeProvider
