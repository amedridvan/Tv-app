import axios from "axios";
import { useEffect } from "react";


const Genres = ( {
  setSelectedGenres ,
  setGenres,
  type,
  setPage,
  selectedGenres,
  genres
} :any  ) => {
  const handleAdd = (genre :any) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g: { id: any; }) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre :any) => {
    setSelectedGenres(
      selectedGenres.filter((selected: { id: any; }) => selected.id !== genre.id)
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
    <div className="flex flex-row justify-center items-center flex-wrap bg-slate-900 rounded-md mb-2">
      {selectedGenres ?.map((genre :any) => (
        <div
        className='bg-stone-500  rounded-full p-2 cursor-pointer  hover:bg-pink-700  '
          style={{ margin: 2 }}
          key={genre.id}
          onClick={() => handleRemove(genre)}
        >
        {genre.name}
        </div>
      ))}
      {genres?.map((genre :any) => (
        <div className='bg-stone-100 rounded-full  p-2 cursor-pointer hover:bg-green-500'
          style={{ margin: 2 }}
          key={genre.id}
          onClick={() => handleAdd(genre )}
        >
        {genre.name}
        </div>
      ))}
    </div>
    </> 
  );
};

export default Genres;