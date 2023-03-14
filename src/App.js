import { useEffect, useRef, useState } from "react";
import "./App.css";
import { OMDB_API, SearchIcon } from "./utils/config";

// Here is your key: fd7aacb4
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=fd7aacb4

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("Superman");
  const title = useRef();

  const searchmovies = async (title) => {
    const response = await fetch(`${OMDB_API.URL}&s=${title}`);
    const data = await response.json();

    if (data.Search && data.Search.length > 0) {
      console.log("data.Search");
      setMovies(data.Search);
    }
  };

  const movie1 = {
    Title: "Captain America: The First Avenger",
    Year: "2011",
    imdbID: "tt0458339",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg",
  };

  useEffect(() => {
    //setMovies([movie1]);
    searchmovies(searchTitle);
  }, []);

  return (
    <div className="app">
      <h1>OMDb Movie Search</h1>

      <div className="search">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            searchmovies(searchTitle);
          }}
        >
          <input
            value={searchTitle}
            placeholder="search for movies"
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => {
              searchmovies(searchTitle);
            }}
          />
        </form>
      </div>

      <div className="container">
        {movies.map((movie, idx) => (
          <div key={idx} className="movie">
            <div>
              <p>2023</p>
            </div>
            <div>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/400"
                }
              />
            </div>
            <div>
              <span> {movie.Type}</span>
              <h3>{movie.Title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
