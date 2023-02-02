const useGenre = (selectedGenres :any) => {
    if (selectedGenres.length < 1) return "";
  
    const GenreIds = selectedGenres.map((g:any) => g.id);
    return GenreIds.reduce((acc :any, curr :any) => acc + "," + curr);
  };
  
  export default useGenre;