
import './App.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ResultIndex from './Components/ResultIndexComponent/ResultIndex';
import { useState } from 'react';

function App() {

  const [searchFormState, setSearchFormState ] = useState({})

  function changeHandler(e){
    let name = e.target.name;
    let value = e.target.value;
    setSearchFormState(prev=>{
      return({
        ...prev,
        [name] : value
      })
    })
    console.log(searchFormState);
  }


  return (
    <div className="App">
        <div className="searchbar-wrapper">

          <form className="searchbar" onChange={changeHandler}>

              <div className="searchbox">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x"/>
                <input type="text" name="search-field" id="search-field"  />
              </div>
              
      
              <div className="radio-div">
                <div className="field-title">TYPE</div>
                <input type="radio" id="any" name="type" value="any"/>
                <label htmlFor="any">Any</label>
                <input type="radio" id="movies" name="type" value="movies"/>
                <label htmlFor="movies">Movies</label>
                <input type="radio" id="series" name="type" value="series"/>
                <label htmlFor="series">Series</label>
                <input type="radio" id="episodes" name="type" value="episodes"/>
                <label htmlFor="episodes">Episodes</label>
              </div>

          </form>

        </div>




        <ResultIndex searchTerm={"blah blah"}/>

       
    </div>
  );
}

export default App;
