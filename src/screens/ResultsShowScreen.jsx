import React, { useState, useEffect } from "react";
import {Image, View, Text, StyleSheet, FlatList, image } from 'react-native';
import yelp from '../api/yelp'

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');
    console.log(JSON.stringify(result, null, 2))
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(response.data);
    };
    useEffect(() => {
        getResult(id)
    }, [])
    if(!result) {
        return null;
    }
    return (
        <View>
            <Text>{result.name}</Text>
            <FlatList 
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({item}) => {
                    return (
                        <Image style={styles.image} source={{ uri: item}} />
                    )
                }}
            />
        </View>
    )
    
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300
    }

})

export default ResultsShowScreen;