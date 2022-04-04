
import './App.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ResultIndex from './Components/ResultIndexComponent/ResultIndex';
import { useState, useRef } from 'react';


function App() {

  //this state is for handing the change in the searchbar form
  //this state would hold whatever information is currently in the navbar form
  //use with changeHandler func
  const [searchFormState, setSearchFormState ] = useState({});

  //this sets the terms that will be later sent to the api call on submit
  //used with submitHandler() function
  const [requestedDataState, setRequestedData] = useState([]);

  //this state is to control whether or not the load more button is displayed
  // used with submitHandler() and callApi()
  const [loadMoreBtnState, setLoadMoreBtnState] = useState(false)

  //state to hold the result count
  const [resultCountState, setResultCountState] = useState()


  //params : event
  //updates searchFromState with the form infomation
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

  
  //this is used to keep track of which page to call next with the api. useRef used because we need to preserve value with each rerender.
  const page = useRef(1);

  //@params : event
  //triggers when form is submitted, calls the api with the form data
  //updates requestedData state to be empty array and calls api with the form info.
  function submitHandler(e){
    e.preventDefault(); //prevent page from reloading which is standard html behavior
    console.log(searchFormState);
    setRequestedData([]);   //reset the state of the result list to zero so that old results arent displayed (this is important becaue the callApi function appends to the existing list)
    
    callApi(searchFormState.searchField, page)
  }

  //@params : none
  //updates the page variable so that the api can call the next page
  //loads more results using the api
  function loadMore(){
    page.current = page.current + 1
    callApi(searchFormState.searchField, page.current)
  }

  //@params : searchTerm(string), page{int}
  //send get request to api and update the state RequestedData
  //requestedData is used as a prop for the ResultIndex component so it triggers a rerender of it
  function callApi(searchTerm, page) {
    fetch(`http://www.omdbapi.com/?apikey=6187632f&s=${searchFormState.searchField}&page=${page}`)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log("data response is");
        console.log(data);
        console.log(data.Response);
        setResultCountState(data.totalResults);
        if(data.Response === "True"){
          setRequestedData(prev => [...prev, ...data.Search]);
          setLoadMoreBtnState(true);
        }
        else
          setLoadMoreBtnState(false);
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

          </form>

        </div>



        <div className="result-canvas">

            <div className="result-list-div">
                <div className="result-count-info">{resultCountState} RESULTS</div>
                <ResultIndex responseData={requestedDataState}/>
                {loadMoreBtnState?<button onClick={loadMore}>more</button>:""}
            </div>

            <div className="result-fullinfo-div">

                <div className="movie-hero">
                    <img className="poster" src="https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" alt="" />
                    <div className="hero-text">
                        <div className="title">Star Wars - the empire strkies back</div>
                        <div className="additional-info">
                            <div className="rated">PG</div>
                            <div className="year">1990</div>
                            <div className="tags">Action, Adventure, Fantasy</div>
                            <div className="time">24mins</div>
                        </div>
                        <div className="actors">Mark Hamill, Harrison Ford, Carrie Fisher</div>
                    </div>
                </div>

                <div className="synopsis">Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vad</div>

                <div className="ratings">
                    <div className="rating-block">
                      <div className="rating">8.7/10</div>
                      <div className="rating-name">Rotten Tomatoes</div>
                    </div>
                    <div className="rating-block-mid">
                      <div className="rating">8.7/10</div>
                      <div className="rating-name">Rotten Tomatoes</div>
                    </div>
                    <div className="rating-block">
                      <div className="rating">8.7/10</div>
                      <div className="rating-name">Rotten Tomatoes</div>
                    </div>
                </div>
            </div>
        </div>
        

       
    </div>
  );
}

export default App;
