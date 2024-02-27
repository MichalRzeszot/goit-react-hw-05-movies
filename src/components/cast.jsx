import { useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import css from './cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=492aa469db167d08ffbb05ac7fdafe78`;
  const { data, isLoading, error } = useFetch(url);
  return (
    <div>
      {error && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      {data &&
        (data.cast.length > 0 ? (
          <div>
            <ul className={css.castList}>
              {data.cast.map(cast => (
                <li key={cast.id}>
                  <h3>{cast.name}</h3>
                  <p>{cast.character}</p>
                  {cast.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt=""
                    />
                  ) : (
                    <p>No photo</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No cast yet</div>
        ))}
    </div>
  );
};

export default Cast;
