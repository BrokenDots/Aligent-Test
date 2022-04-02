
import './ResultIndex.css';


function ResultIndex(props) {
    let movieArray = props.responseData;
    console.log(movieArray);
    return (
        <div id="resultList">
            {movieArray ? movieArray.map(ele=>(<h2>{ele.Title}</h2>)): ""}
        </div>
        
    );
}

export default ResultIndex;
