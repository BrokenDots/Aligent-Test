
import './App.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ResultIndex from './Components/ResultIndexComponent/ResultIndex';
import { useState } from 'react';

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


  //this state is used for setting the queries that will be used by the api.
  //this could be bundled with the changehandler but I did not want to keep making api requests for each change that occured in the form as we can only make limited rquests perday. This is only triggered on a submit event of the form.
  //setter method used with the submit function on searchbar form
  //also contains the fetch api along which make the get request
  //we will later use the data obtained as props for the ResultsIndex component
  const [requestedDataState, setRequestedData] = useState({});

  function submitHandler(e){
    e.preventDefault(); 
    console.log(searchFormState);
    setRequestedData(searchFormState);
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




        <ResultIndex searchTerm={requestedDataState}/>

       
    </div>
  );
}

export default App;
