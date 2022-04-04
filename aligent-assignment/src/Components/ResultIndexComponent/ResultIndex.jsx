
import './ResultIndex.css';


function ResultIndex(props) {
    let movieArray = props.responseData;
    // console.log(movieArray);
    return (
        <div id="resultList">
            
            {movieArray.map((element)=>{
                return(
                    <div className="result-list-item" key={element.imdbID}>
                        <img className="movie-poster" src={element.Poster} alt="" />
                        <div className="movie-info">
                            <div className="title">{element.Title}</div>
                            <div className="year">{element.Year}</div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
        
    );
}

export default ResultIndex;
