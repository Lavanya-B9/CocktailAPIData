import React, { useEffect, useState } from 'react';
import './DrinkStyles.css';
const URL ='https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const Drinks = () => {
    const[drinksData,setDrinksData] = useState([]);
    const [searchDrink,setSearchDrink] = useState('');
    const [loading,setLoading] = useState(false);
    const [isError,setIsError] = useState({status:false,msg:''});

    const fetchDrink = async (apiURL) => {
        setLoading(true)
        setIsError({status:false,msg:''})
    try {
            const response = await fetch(apiURL);
            const {drinks} = await response.json();
            setDrinksData(drinks);
            setLoading(false)
           setIsError({status:false,msg:''})
           if(!drinks){
            throw new Error ('data not found')
           }
 
        
    } catch (error) {
        setIsError({status:true,msg:error.message || 'something went wrong'})
        setLoading(false);
        
    }
   
       
    }
    useEffect (()=>{
        const finalURL = `${URL}${searchDrink}`;
        fetchDrink(finalURL);

    },[searchDrink])
  return (
    <div>
        <form>
            <h1>cocktail API data</h1>
            <input type='search' placeholder='search here...' onChange={(e)=> setSearchDrink(e.target.value)} value={searchDrink}/>
        </form> 
        {loading && !isError?.status&& <h1>loading.....</h1>}
        {isError?.status&& <h3>{isError.msg}</h3>}

        
       {
       !loading &&  !isError?.status && <div className='drinks-container'>
        
       {
           drinksData.map((eachDrink)=>{
               const {idDrink,strDrink,strDrinkThumb}= eachDrink;
               return <div key={idDrink}>
                   
                       <img src={strDrinkThumb} alt='DrinkImg'/>
                       <h3>{strDrink}</h3>
               </div>
           })
       }
       </div>
  
       }
    </div>
  )
}

export default Drinks