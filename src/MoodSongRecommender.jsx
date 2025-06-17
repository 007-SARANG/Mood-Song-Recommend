import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

const moodOptions = ['Happy', 'Sad', 'Chill', 'Energetic', 'Romantic'];
const languageOptions = ['Bollywood', 'Hollywood'];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const mockData = {
  Bollywood: {
    Happy: [
      { name: 'Gallan Goodiyan', artist: 'Dil Dhadakne Do', url: 'https://open.spotify.com/track/1' },
      { name: 'Desi Girl', artist: 'Dostana', url: 'https://open.spotify.com/track/2' },
      { name: 'Tareefan', artist: 'Veere Di Wedding', url: 'https://open.spotify.com/track/3' },
      { name: 'Bom Diggy Diggy', artist: 'Zack Knight', url: 'https://open.spotify.com/track/4' },
      { name: 'London Thumakda', artist: 'Queen', url: 'https://open.spotify.com/track/5' },
      { name: 'Kar Gayi Chull', artist: 'Kapoor & Sons', url: 'https://open.spotify.com/track/6' },
      { name: 'Cutiepie', artist: 'Ae Dil Hai Mushkil', url: 'https://open.spotify.com/track/7' },
      { name: 'Abhi Toh Party Shuru Hui Hai', artist: 'Khoobsurat', url: 'https://open.spotify.com/track/8' },
      { name: 'High Rated Gabru', artist: 'Guru Randhawa', url: 'https://open.spotify.com/track/9' },
      { name: 'Swag Se Swagat', artist: 'Tiger Zinda Hai', url: 'https://open.spotify.com/track/10' }
    ],
    Sad: [
      { name: 'Channa Mereya', artist: 'Arijit Singh', url: 'https://open.spotify.com/track/11' },
      { name: 'Agar Tum Saath Ho', artist: 'Tamasha', url: 'https://open.spotify.com/track/12' },
      { name: 'Tujhe Bhula Diya', artist: 'Anjaana Anjaani', url: 'https://open.spotify.com/track/13' },
      { name: 'Kabira', artist: 'Yeh Jawaani Hai Deewani', url: 'https://open.spotify.com/track/14' },
      { name: 'Hamari Adhuri Kahani', artist: 'Arijit Singh', url: 'https://open.spotify.com/track/15' },
      { name: 'Phir Le Aaya Dil', artist: 'Barfi', url: 'https://open.spotify.com/track/16' },
      { name: 'Kal Ho Naa Ho', artist: 'Sonu Nigam', url: 'https://open.spotify.com/track/17' },
      { name: 'Tera Yaar Hoon Main', artist: 'Sonu Ke Titu Ki Sweety', url: 'https://open.spotify.com/track/18' },
      { name: 'Tadap Tadap', artist: 'Hum Dil De Chuke Sanam', url: 'https://open.spotify.com/track/19' },
      { name: 'Jeene Bhi De', artist: 'Anand Raj Anand', url: 'https://open.spotify.com/track/20' }
    ],
    Chill: [
      { name: 'Raabta', artist: 'Agent Vinod', url: 'https://open.spotify.com/track/21' },
      { name: 'Ilahi', artist: 'Yeh Jawaani Hai Deewani', url: 'https://open.spotify.com/track/22' },
      { name: 'Zehnaseeb', artist: 'Hasee Toh Phasee', url: 'https://open.spotify.com/track/23' },
      { name: 'Tum Mile (Love Reprise)', artist: 'Pritam', url: 'https://open.spotify.com/track/24' },
      { name: 'Pee Loon', artist: 'Once Upon A Time in Mumbaai', url: 'https://open.spotify.com/track/25' },
      { name: 'Khuda Jaane', artist: 'Bachna Ae Haseeno', url: 'https://open.spotify.com/track/26' },
      { name: 'Afreen Afreen', artist: 'Rahat Fateh Ali Khan', url: 'https://open.spotify.com/track/27' },
      { name: 'Tera Ban Jaunga', artist: 'Kabir Singh', url: 'https://open.spotify.com/track/28' },
      { name: 'O Saathi', artist: 'Baaghi 2', url: 'https://open.spotify.com/track/29' },
      { name: 'Nazm Nazm', artist: 'Bareilly Ki Barfi', url: 'https://open.spotify.com/track/30' }
    ],
    Energetic: [
      { name: 'Malhari', artist: 'Bajirao Mastani', url: 'https://open.spotify.com/track/31' },
      { name: 'Zinda', artist: 'Bhaag Milkha Bhaag', url: 'https://open.spotify.com/track/32' },
      { name: 'Jai Jai Shivshankar', artist: 'War', url: 'https://open.spotify.com/track/33' },
      { name: 'Ghungroo', artist: 'War', url: 'https://open.spotify.com/track/34' },
      { name: 'Kala Chashma', artist: 'Baar Baar Dekho', url: 'https://open.spotify.com/track/35' },
      { name: 'Ude Dil Befikre', artist: 'Befikre', url: 'https://open.spotify.com/track/36' },
      { name: 'Nashe Si Chadh Gayi', artist: 'Befikre', url: 'https://open.spotify.com/track/37' },
      { name: 'Aila Re', artist: 'Malaal', url: 'https://open.spotify.com/track/38' },
      { name: 'Dil Chori', artist: 'Sonu Ke Titu Ki Sweety', url: 'https://open.spotify.com/track/39' },
      { name: 'Jhoome Jo Pathaan', artist: 'Pathaan', url: 'https://open.spotify.com/track/40' }
    ],
    Romantic: [
      { name: 'Tum Hi Ho', artist: 'Aashiqui 2', url: 'https://open.spotify.com/track/41' },
      { name: 'Janam Janam', artist: 'Dilwale', url: 'https://open.spotify.com/track/42' },
      { name: 'Pee Loon', artist: 'OUATIM', url: 'https://open.spotify.com/track/43' },
      { name: 'Tera Hone Laga Hoon', artist: 'Ajab Prem Ki Ghazab Kahani', url: 'https://open.spotify.com/track/44' },
      { name: 'Hawayein', artist: 'Jab Harry Met Sejal', url: 'https://open.spotify.com/track/45' },
      { name: 'Raabta', artist: 'Agent Vinod', url: 'https://open.spotify.com/track/46' },
      { name: 'Jeene Laga Hoon', artist: 'Ramaiya Vastavaiya', url: 'https://open.spotify.com/track/47' },
      { name: 'Enna Sona', artist: 'Ok Jaanu', url: 'https://open.spotify.com/track/48' },
      { name: 'Sun Saathiya', artist: 'ABCD 2', url: 'https://open.spotify.com/track/49' },
      { name: 'Kesariya', artist: 'Brahmāstra', url: 'https://open.spotify.com/track/50' }
    ]
  },
  Hollywood: {
    Happy: [
      { name: 'Happy', artist: 'Pharrell Williams', url: 'https://open.spotify.com/track/51' },
      { name: 'Can’t Stop the Feeling!', artist: 'Justin Timberlake', url: 'https://open.spotify.com/track/52' },
      { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', url: 'https://open.spotify.com/track/53' },
      { name: 'Shut Up and Dance', artist: 'WALK THE MOON', url: 'https://open.spotify.com/track/54' },
      { name: 'Best Day Of My Life', artist: 'American Authors', url: 'https://open.spotify.com/track/55' },
      { name: 'On Top of the World', artist: 'Imagine Dragons', url: 'https://open.spotify.com/track/56' },
      { name: 'I Gotta Feeling', artist: 'The Black Eyed Peas', url: 'https://open.spotify.com/track/57' },
      { name: 'Wake Me Up', artist: 'Avicii', url: 'https://open.spotify.com/track/58' },
      { name: 'Counting Stars', artist: 'OneRepublic', url: 'https://open.spotify.com/track/59' },
      { name: 'Blinding Lights', artist: 'The Weeknd', url: 'https://open.spotify.com/track/60' }
    ]
  }
};

export default function MoodSongRecommender() {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [songs, setSongs] = useState([]);

  const fetchSongs = useCallback((mood, language) => {
    const result = mockData[language]?.[mood] || [];
    const shuffled = shuffleArray(result).slice(0, 10);
    setSongs(shuffled);
  }, []);

  useEffect(() => {
    if (selectedMood && selectedLanguage) {
      fetchSongs(selectedMood, selectedLanguage);
    }
  }, [selectedMood, selectedLanguage, fetchSongs]);

  useEffect(() => {
    if (songs.length > 0) {
      document.getElementById('playlist')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [songs]);

  const handleExportPlaylist = () => {
    const songTitles = songs.map(song => `${song.name} by ${song.artist}`).join('\n');
    const blob = new Blob([songTitles], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedMood}_${selectedLanguage}_playlist.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎵 Mood-Based Song Recommender</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {moodOptions.map(mood => (
          <Button
            key={mood}
            variant={selectedMood === mood ? 'default' : 'outline'}
            onClick={() => {
              if (selectedMood !== mood) {
                setSelectedMood(mood);
                setSelectedLanguage('');
                setSongs([]);
              }
            }}
          >
            {mood}
          </Button>
        ))}
      </div>

      {selectedMood && !selectedLanguage && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Choose a Language:</h2>
          <div className="flex gap-2">
            {languageOptions.map(lang => (
              <Button key={lang} onClick={() => setSelectedLanguage(lang)}>{lang}</Button>
            ))}
          </div>
        </div>
      )}

      {selectedLanguage && songs.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Playlist: {selectedMood} ({selectedLanguage})</h2>
          <Button onClick={handleExportPlaylist} aria-label="Download Playlist" className="mb-4">⬇️ Export Playlist</Button>
          <Button onClick={() => fetchSongs(selectedMood, selectedLanguage)} className="mb-4 ml-2" aria-label="Refresh Playlist">🔁 Refresh</Button>
          <div id="playlist" className="grid gap-3">
            {songs.map((song, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <p className="font-medium text-black">🎶 {song.name}</p>
                  <p className="text-sm text-muted-foreground">by {song.artist}</p>
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    Listen on Spotify
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedLanguage && songs.length === 0 && (
        <p className="text-sm text-red-500 mt-2">No songs found for this combination.</p>
      )}
    </div>
  );
}
