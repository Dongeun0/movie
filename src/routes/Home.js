import {useState, useEffect} from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true); //첫번째는 data, 2번째는 data 수정 가능
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []); //중괄호 코드가 단 한번만 작동. 대괄호에 아무것도 없으면 의존이나 주시하지 않는다

  return <div className={styles.container}>
    {loading ? (
      <div className={styles.loader}>
          <span>Loading...</span>
        </div>
    ) : (
      <div className={styles.movies}>
        {movies.map((movie) => (
          <Movie 
            key={movie.id}
            id={movie.id}
            year={movie.year}
            coverImg={movie.medium_cover_image} 
            title={movie.title} 
            summary={movie.summary} 
            genres={movie.genres} 
          />
        ))}
      </div>)}
  </div>
}

export default Home;