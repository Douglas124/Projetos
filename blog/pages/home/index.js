import React, { useEffect, useState } from 'react'
import {View, StyleSheet, FlatList, ActivityIndicator, useWindowDimensions} from 'react-native'
import BlogPost from '../../components/blogpost'

export default function Home({navigation}){

    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { width } = useWindowDimensions()

    const getPostsAPI = async () => {
        try{
            setLoading(true) 
            const response = await fetch('https://dev-backend-imd.herokuapp.com/api/posts')
            const posts = await response.json()
            setPosts(posts.posts)
        }catch(error){
            alert('Falha ao carregar postagens. Tente novamente mais tarde.')
            setPosts([])
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPostsAPI()
    }, [])


    return (
        <View style={styles.container}>
            {
                isLoading 
                    ? <ActivityIndicator /> 
                    : <FlatList style={styles.lista} data={posts} renderItem={({item}) => <BlogPost preview={true} width={width} navigation={navigation} item={item} />} keyExtractor={(item) => "#" + item.id}></FlatList>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    }, 
    lista: {
        flex: 1,
        marginTop: 44
    }
})