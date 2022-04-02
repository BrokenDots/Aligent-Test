
import './App.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ResultIndex from './Components/ResultIndexComponent/ResultIndex';
import { useState, useEffect } from 'react';

function App() {

  //this state is for handing the change in the searchbar form
  //setter used in the changeHandler function
  const [searchFormState, setSearchFormState ] = useState({});

  function changeHandler(e){
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setSearchFormState(prev=>{
      return({
        ...prev,
        [name] : value
      })
    })
  }

  var page = 1;
  //this sets the terms that will be later sent to the api call on submit
  const [requestedDataState, setRequestedData] = useState([]);

  function submitHandler(e){
    e.preventDefault(); 
    console.log(searchFormState);
    page = 1;
    callApi(searchFormState.searchField, page)
  }

  

  useEffect(() => {
      const myDiv = document.getElementById('resultList')  
      myDiv.addEventListener('scroll', () => {  
        if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {  
            console.log('scrolled to bottom')
            callApi(searchFormState.searchField, page)
        }  
      })
  });

  function callApi(searchTerm, page) {
    fetch(`http://www.omdbapi.com/?apikey=6187632f&s=${searchFormState.searchField}&page=${page}`)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        setRequestedData(prev => [...prev, ...data.Search]);
    })
  }


  return (
    <div className="App">
        <div className="searchbar-wrapper">

          <form className="searchbar" onSubmit={submitHandler}>

              <div className="searchbox">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x"/>
                <input type="text" name="searchField" id="search-field" onChange={changeHandler} />
              </div>
              
      
              <div className="radio-div">
                <div className="field-title">TYPE</div>
                <input type="radio" id="any" name="type" value="any" onChange={changeHandler}/>
                <label htmlFor="any">Any</label>
                <input type="radio" id="movies" name="type" value="movies" onChange={changeHandler}/>
                <label htmlFor="movies">Movies</label>
                <input type="radio" id="series" name="type" value="series" onChange={changeHandler}/>
                <label htmlFor="series">Series</label>
                <input type="radio" id="episodes" name="type" value="episodes" onChange={changeHandler}/>
                <label htmlFor="episodes">Episodes</label>
              </div>

              <button type='submit'>Search</button>
          </form>

        </div>




        <ResultIndex responseData={requestedDataState}/>

       
    </div>
  );
}

export default App;
