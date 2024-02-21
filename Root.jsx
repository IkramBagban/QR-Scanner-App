import { View, Text } from 'react-native'
import React from 'react'
import App from './App'
import { ThemeProvider } from './src/Context/ThemeProvider'

const Root = () => {
    return (
        <>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </>
    )
}

export default Root