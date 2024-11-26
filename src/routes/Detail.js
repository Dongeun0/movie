import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Detail.module.css";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [details, setDetail] = useState([]);
    const {id} = useParams();
    const getDetails = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setDetail(json.data.movie);
        setLoading(false);
    };
    useEffect(() => {
        getDetails();
    }, [id]);

    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movie}>
                    {details && (
                        <Movie 
                            key={details.id}
                            id={details.id}
                            year={details.year}
                            coverImg={details.medium_cover_image}
                            title={details.title}
                            summary={details.summary}
                            genres={details.genres}
                        />
                    )}
                </div>)}
        </div>
    )
}
export default Detail;