import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';

interface SideBarProps{
  setSelectedGenre: React.Dispatch<React.SetStateAction<GenreResponseProps>>;
}

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({setSelectedGenre}:SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [genreId, setGenreId] = useState(1);

  function handleClickButton(id: number) {
    setGenreId(id)
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${genreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  },[genreId])

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={genreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}