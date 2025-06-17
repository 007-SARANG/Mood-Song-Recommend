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
    { name: 'Happy', artist: 'Pharrell Williams', url: 'https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH' },
    { name: 'Can’t Stop the Feeling!', artist: 'Justin Timberlake', url: 'https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc' },
    { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', url: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS' },
    { name: 'Shut Up and Dance', artist: 'WALK THE MOON', url: 'https://open.spotify.com/track/3XVBdLihbNbxUwZosxcGuJ' },
    { name: 'Best Day Of My Life', artist: 'American Authors', url: 'https://open.spotify.com/track/0yW7w8F2TV054ZdJFpsZeJ' },
    { name: 'On Top of the World', artist: 'Imagine Dragons', url: 'https://open.spotify.com/track/4VNCYfAjo5Pqocgz9SVY5g' },
    { name: 'I Gotta Feeling', artist: 'The Black Eyed Peas', url: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3' },
    { name: 'Wake Me Up', artist: 'Avicii', url: 'https://open.spotify.com/track/4kLLKC6I3HKAiJCwP64rY6' },
    { name: 'Counting Stars', artist: 'OneRepublic', url: 'https://open.spotify.com/track/7DT5tdI9O1k7F4blJYpFOZ' },
    { name: 'Blinding Lights', artist: 'The Weeknd', url: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b' }
  ],
  Sad: [
    { name: 'Someone Like You', artist: 'Adele', url: 'https://open.spotify.com/track/4kffe26Fpiu16D46hQtzKC' },
    { name: 'Let Her Go', artist: 'Passenger', url: 'https://open.spotify.com/track/7Cuk8AT0RtuZC2Z3E9E1oB' },
    { name: 'Jar of Hearts', artist: 'Christina Perri', url: 'https://open.spotify.com/track/06OVEaG2GjBacP9N6ylXOR' },
    { name: 'Stay With Me', artist: 'Sam Smith', url: 'https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P' },
    { name: 'Fix You', artist: 'Coldplay', url: 'https://open.spotify.com/track/7B5E6v9FnORfUTwZuuzMPl' },
    { name: 'Hurt', artist: 'Johnny Cash', url: 'https://open.spotify.com/track/2aA7RkgauQAR8v2LCsspRv' },
    { name: 'Someone You Loved', artist: 'Lewis Capaldi', url: 'https://open.spotify.com/track/7z7JgZRXGRAucdcgqfYFTY' },
    { name: 'All I Want', artist: 'Kodaline', url: 'https://open.spotify.com/track/1g1atzXE1eOUE8j6p61fRs' },
    { name: 'Say Something', artist: 'A Great Big World & Christina Aguilera', url: 'https://open.spotify.com/track/7kWP19mQXSwGJaIWVjZJdp' },
    { name: 'When I Was Your Man', artist: 'Bruno Mars', url: 'https://open.spotify.com/track/6kH9SV1wl0NrTdpZgVY2XW' }
  ],
  Chill: [
    { name: 'Sunflower', artist: 'Post Malone & Swae Lee', url: 'https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P' },
    { name: 'Electric Feel', artist: 'MGMT', url: 'https://open.spotify.com/track/7yxiOd4oYM96yILmwbOix4' },
    { name: 'Budapest', artist: 'George Ezra', url: 'https://open.spotify.com/track/2VK1qcMpkbL3L7uWcXBdto' },
    { name: 'Put It All On Me', artist: 'Ed Sheeran', url: 'https://open.spotify.com/track/2vnCQA0hCyYry3W3agAOoM' },
    { name: 'Yellow', artist: 'Coldplay', url: 'https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl' },
    { name: 'Riptide', artist: 'Vance Joy', url: 'https://open.spotify.com/track/3ZCTVFBt2Brf31RLEnCkWJ' },
    { name: 'Someone To You', artist: 'Banners', url: 'https://open.spotify.com/track/6ZHevI943kaVeIxd4U6bEj' },
    { name: 'Holocene', artist: 'Bon Iver', url: 'https://open.spotify.com/track/4y6aHjDUabRtIdbqRi6VEr' },
    { name: 'Cigarette Daydreams', artist: 'Cage the Elephant', url: 'https://open.spotify.com/track/3BqTaPOqA8YBfsz4xm1knp' },
    { name: 'Breathe Me', artist: 'Sia', url: 'https://open.spotify.com/track/6fnndZ6RVPYSRxwLac0Kwx' }
  ],
  Energetic: [
    { name: 'Can’t Hold Us', artist: 'Macklemore & Ryan Lewis', url: 'https://open.spotify.com/track/3m8KGkGxxjMxHG8wTQwFFR' },
    { name: 'Believer', artist: 'Imagine Dragons', url: 'https://open.spotify.com/track/0pqnGHJpmpxLKifKRmU6o8' },
    { name: 'Don’t Stop Me Now', artist: 'Queen', url: 'https://open.spotify.com/track/5t1QoQPpwLkB0rA6GReM1B' },
    { name: 'Eye of the Tiger', artist: 'Survivor', url: 'https://open.spotify.com/track/2KH16WveTQWT6KOG9Rg6e2' },
    { name: 'Thunder', artist: 'Imagine Dragons', url: 'https://open.spotify.com/track/2kaHxO6gUWZ8m0ucN6tMGW' },
    { name: 'Happy Now', artist: 'Kygo & Sandro Cavazza', url: 'https://open.spotify.com/track/0h4Sb019wMH5ShZKnS0BYe' },
    { name: 'Locked Out of Heaven', artist: 'Bruno Mars', url: 'https://open.spotify.com/track/2eRyUmPdZzuiTVvRrMLDfD' },
    { name: 'High Hopes', artist: 'Panic! At The Disco', url: 'https://open.spotify.com/track/7lXNUjfyQXUxEnWVNIDES7' },
    { name: 'Raise Your Glass', artist: 'P!nk', url: 'https://open.spotify.com/track/6DcHb94KLu4Tt2p8tz6Aqx' },
    { name: 'Firework', artist: 'Katy Perry', url: 'https://open.spotify.com/track/00aWjryQcrdE9joJHAIG1G' }
  ],
  Romantic: [
    { name: 'All of Me', artist: 'John Legend', url: 'https://open.spotify.com/track/1S0jjzjUsIlWdqmQ3RAlmM' },
    { name: 'Perfect', artist: 'Ed Sheeran', url: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v' },
    { name: 'Shallow', artist: 'Lady Gaga & Bradley Cooper', url: 'https://open.spotify.com/track/1V4N9YQQoQzBphAn3e6j3Q' },
    { name: 'My Heart Will Go On', artist: 'Celine Dion', url: 'https://open.spotify.com/track/1uMcsdJC20wWlXAloyDIXT' },
    { name: 'Can’t Help Falling in Love', artist: 'Elvis Presley', url: 'https://open.spotify.com/track/3yIi32dfNvbSRcPt1FOzRN' },
    { name: 'I Will Always Love You', artist: 'Whitney Houston', url: 'https://open.spotify.com/track/3JWTaaS7Ld5w54k1tkU6P1' },
    { name: 'Unchained Melody', artist: 'The Righteous Brothers', url: 'https://open.spotify.com/track/2tUBqZG2AbRi7Q0BIrVrEj' },
    { name: 'Endless Love', artist: 'Diana Ross & Lionel Richie', url: 'https://open.spotify.com/track/5MNDe1tjGbICMxyqjDPYNZ' },
    { name: 'Just the Way You Are', artist: 'Bruno Mars', url: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3' },
    { name: 'Because You Loved Me', artist: 'Celine Dion', url: 'https://open.spotify.com/track/3wC7F2PzlxiNt7cOljF3Nu' }
  ],
}

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
