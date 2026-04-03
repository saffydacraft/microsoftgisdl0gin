import { useState } from "react";
import { Gamepad2, ChevronDown, ChevronRight, X, AlertTriangle } from "lucide-react";

interface Game {
  name: string;
  url: string;
  mathLabel: string;
}

const games: Game[] = [
  { name: "2048", url: "https://play2048.co/", mathLabel: "math 1" },
  { name: "Asteroids", url: "https://freeasteroids.org/", mathLabel: "math 2" },
  { name: "Breakout", url: "https://www.google.com/search?q=atari+breakout", mathLabel: "math 3" },
  { name: "Chess", url: "https://www.chess.com/play/computer", mathLabel: "math 4" },
  { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/", mathLabel: "math 5" },
  { name: "Cut the Rope", url: "https://cuttherope.io/", mathLabel: "math 6" },
  { name: "Dinosaur Game", url: "https://chromedino.com/", mathLabel: "math 7" },
  { name: "Doodle Jump", url: "https://doodlejump.io/", mathLabel: "math 8" },
  { name: "Flappy Bird", url: "https://flappybird.io/", mathLabel: "math 9" },
  { name: "Geometry Dash", url: "https://geometrydashonline.io/", mathLabel: "math 10" },
  { name: "HexGL", url: "https://hexgl.bkcore.com/play/", mathLabel: "math 11" },
  { name: "Minesweeper", url: "https://minesweeper.online/", mathLabel: "math 12" },
  { name: "Pac-Man", url: "https://www.google.com/logos/2010/pacman10-i.html", mathLabel: "math 13" },
  { name: "Retro Bowl", url: "https://retrobowl.me/", mathLabel: "math 14" },
  { name: "Slope", url: "https://slopegame.io/", mathLabel: "math 15" },
  { name: "Snake", url: "https://playsnake.org/", mathLabel: "math 16" },
  { name: "Subway Surfers", url: "https://subwaysurfers.co/", mathLabel: "math 17" },
  { name: "Tetris", url: "https://tetris.com/play-tetris", mathLabel: "math 18" },
  { name: "Wordle", url: "https://www.nytimes.com/games/wordle/", mathLabel: "math 19" },
  { name: "Zombs Royale", url: "https://zombsroyale.io/", mathLabel: "math 20" },
];

// Group games by first letter
const groupedGames = games.reduce<Record<string, Game[]>>((acc, game) => {
  const letter = game.name[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(game);
  return acc;
}, {});

const sortedLetters = Object.keys(groupedGames).sort();

const HtmlGames = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isPanicking, setIsPanicking] = useState(false);

  const toggleSection = (letter: string) => {
    setOpenSections((prev) => ({ ...prev, [letter]: !prev[letter] }));
  };

  const handlePanic = () => {
    setIsPanicking(true);
    setActiveGame(null);
  };

  if (isPanicking) {
    return (
      <section id="html-games" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">📊 Checking My Grades...</h2>
          <p className="text-muted-foreground mb-8">Loading student portal...</p>
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-8" />
          <button
            onClick={() => setIsPanicking(false)}
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            go back
          </button>
        </div>
      </section>
    );
  }

  if (activeGame) {
    return (
      <section id="html-games" className="py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <X className="w-4 h-4" /> Back to list
            </button>
            <button
              onClick={handlePanic}
              className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <AlertTriangle className="w-4 h-4" />
              PANIC (excuse: checking my grades)
            </button>
          </div>
          <iframe
            src={activeGame.url}
            title={activeGame.name}
            className="w-full rounded-lg border border-border"
            style={{ height: "80vh" }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>
    );
  }

  return (
    <section id="html-games" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-[hsl(var(--nuke-cyan))]" />
            <h2 className="text-3xl font-bold text-[hsl(var(--nuke-cyan))]">
              🎮 HTML GAMES [A-Z]
            </h2>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">
          Click a game to play it embedded right here. Use the panic button to hide fast.
        </p>

        <div className="space-y-1">
          {sortedLetters.map((letter) => (
            <div key={letter}>
              <button
                onClick={() => toggleSection(letter)}
                className="w-full flex items-center gap-2 py-2 px-3 text-foreground font-bold hover:bg-muted/30 rounded transition-colors text-left"
              >
                {openSections[letter] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                {letter}
              </button>
              {openSections[letter] && (
                <div className="ml-6 space-y-1 pb-2">
                  {groupedGames[letter].map((game) => (
                    <button
                      key={game.name}
                      onClick={() => setActiveGame(game)}
                      className="block w-full text-left py-1.5 px-3 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded transition-colors text-sm"
                    >
                      {game.mathLabel} {game.name.toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HtmlGames;
