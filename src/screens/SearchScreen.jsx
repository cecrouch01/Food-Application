import React, { useState,} from "react";
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from "../components/SearchBar";
import yelp from '../api/yelp';
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();
    console.log(JSON.stringify(results, null, 2))

    const filterResultsByPrice = (price) => {
        //price === '$' || '$$' || '$$$'
        return results.filter((result) => {
            return result.price === price;
        })
    }
    return (
        <View>
            <SearchBar 
            term={term} 
            onTermChange={(newTerm) => setTerm(newTerm)} 
            onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text>We have found {results.length} results</Text>
            <ResultsList results={filterResultsByPrice('$')} title='Cost Effective' />
            <ResultsList results={filterResultsByPrice('$$')} title='Bit Pricier' />
            <ResultsList results={filterResultsByPrice('$$$')} title='Big Spender' />
            <ResultsList results={filterResultsByPrice('$$$$')} title='How Much Money Do You Have?!?!' />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default SearchScreen;