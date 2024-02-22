import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { allCanteens, categories } from '../constants'
import CanteenSlide from './CanteenSlide';
import * as Icon from "react-native-feather";

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(allCanteens);

    const handleSearch = (query) => {
        setActiveCategory(0)
        setSearchQuery(query);
        const filteredResults = allCanteens.restaurants.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredData(filteredResults);
    }
    return (
        <>
            {/* search bar */}
            < View className=" mt-5 flex-row items-center space-x-1  pb-2 z-50" >
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray -300">
                    <Icon.Search height="20" width="20" stroke="gray" />
                    <TextInput placeholder='Canteen' className="flex-1 ml-2" onChangeText={handleSearch} />
                </View>
            </View >
            <View
                showsHorizontalScrollIndicator={false}
                className="overflow-visible gap-10 pt-10 items-center justify-evenly flex-row  "
            >
                {
                    categories.map((categories, index) => {
                        let isActive = categories.id == activeCategory;
                        let btnClasss = isActive ? 'border-b-green-900 bg-green-900 p-1 rounded' : '';
                        let txtClasss = isActive ? 'text-white' : '';
                        return (
                            <View key={index}>
                                <TouchableOpacity className={btnClasss}
                                    onPress={() => {
                                        setActiveCategory(categories.id);
                                    }}>
                                    <Text className={txtClasss}>{categories.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
            <CanteenSlide activeCategory={activeCategory} filteredData={filteredData} />
        </>
    )
}