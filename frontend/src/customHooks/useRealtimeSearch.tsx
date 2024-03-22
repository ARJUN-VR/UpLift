import {useState,useEffect} from 'react'
import { useGetSearchResultMutation } from '../redux/slices/userApiSlice';
import { Campaign } from '../utils';

const useRealTimeSearch = ()=>{
    const [searchQuery,setSearchQuery] = useState<string>('')
    const [searchResults,setResults] = useState<Campaign[]>([]);

    const  [search] = useGetSearchResultMutation()

    useEffect(()=>{
        const fetchResults = async()=>{
            try{
                const response = await search(searchQuery).unwrap()
                const arr = response.result
                console.log(arr)
                setResults(arr)
            }catch(error){
                console.log(error)
            }
        }
        if(searchQuery!==''){
            fetchResults()
        }else{
            setResults([])
        }

    },[searchQuery,search])

    const handleSearchQuery = (query:string)=>{
        setSearchQuery(query)
    }

    console.log(searchResults)

    

    return {handleSearchQuery,searchResults,searchQuery}

}

export default useRealTimeSearch