
import './App.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ResultIndex from './Components/ResultIndexComponent/ResultIndex';
import { useState, useEffect, useRef } from 'react';


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

  
  //this sets the terms that will be later sent to the api call on submit
  const [requestedDataState, setRequestedData] = useState([]);

  const page = useRef(1);
  //triggers when form is submitted, calls the api with the form data
  function submitHandler(e){
    e.preventDefault(); 
    console.log(searchFormState);
    // page = 1;
    setRequestedData([]);   //reset the state of the result list to zero so that old results arent displayed (this is important becaue the callApi function appends to the existing list)
    callApi(searchFormState.searchField, page)
  }

  

  //to trigger the scroll end effect
  // useEffect(() => {
  //     const myDiv = document.getElementById('resultList') 
  //     myDiv.addEventListener('scroll', () => {  
  //       if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {  
  //           page++;
  //           console.log('page = ' + page)
  //           callApi(searchFormState.searchField, page)
  //       }  
  //     })
  // });


  function loadMore(){
    page.current = page.current + 1
    callApi(searchFormState.searchField, page.current)
  }

  



  //send get request to api and update the state
  function callApi(searchTerm, page) {
    fetch(`http://www.omdbapi.com/?apikey=6187632f&s=${searchFormState.searchField}&page=${page}`)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log("data response is");
        console.log(data.Response);
        if(data.Response == "True")
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
        <button onClick={loadMore}>more</button>

       
    </div>
  );
}

export default App;
