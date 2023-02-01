import axios from "axios";
import { useEffect } from "react";


const Genres = ({
  selectedGenres ,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=c76f21405a6fbe2e74354773617a04b8&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <div className="flex flex-row justify-center items-center flex-wrap bg-slate-800" style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <div
        className='bg-stone-100 rounded-full p-2 cursor-pointer  hover:bg-pink-700  '
          style={{ margin: 2 }}
          key={genre.id}
          onClick={() => handleRemove(genre)}
        >
        {genre.name}
        </div>
      ))}
      {genres.map((genre) => (
        <div className='bg-slate-600 rounded-full  p-2 cursor-pointer hover:bg-green-500'
          style={{ margin: 2 }}
          key={genre.id}
          onClick={() => handleAdd(genre)}
        >
        {genre.name}
        </div>
      ))}
    </div>
    </> 
  );
};

export default Genres;