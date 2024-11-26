import React from 'react'
import {Text, StyleSheet, Image, TouchableOpacity, ScrollView, View } from 'react-native'
import RenderHTML from 'react-native-render-html'

export default function BlogPost({preview, item, navigation, width}){

    const previewText = preview ? item.texto.substring(0,300) + '...' : item.texto
    const source = {html: `<div style='color: white'>${previewText}</div>`}

    const base = (
        <View><Image style={styles.img} source={{uri: item.foto}}></Image>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <RenderHTML contentWidth={width} source={source}></RenderHTML></View>)

    if (preview){
        return (
            <TouchableOpacity onPress={() => navigation.navigate('BlogPost', {post: item})} style={styles.item}>
                { base }
            </TouchableOpacity>)
    }else{
        return (<ScrollView>
            {base}
        </ScrollView>)
    }

    
    
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'black'
    },
    img: {
        width: '100%',
        height: 250
    },
    titulo: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 10,
        color: 'white'
    }
})