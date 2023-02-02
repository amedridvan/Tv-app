const useGenre = (selectedGenres :[]) => {
    if (selectedGenres.length < 1) return "";
  
    const GenreIds = selectedGenres.map((g:any) => g.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
  };
  
  export default useGenre;