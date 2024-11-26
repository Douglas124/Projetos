import React from 'react'
import {View, StyleSheet, useWindowDimensions} from 'react-native'
import BlogPost from '../../components/blogpost'

export default function PostPage({route, navigation}){

    const { width } = useWindowDimensions()

    return <View style={styles.container}>
        <BlogPost preview={false} width={width} item={route.params.post} navigation={navigation}></BlogPost>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})