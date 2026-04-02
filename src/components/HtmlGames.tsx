import { Gamepad2, ExternalLink } from "lucide-react";

interface Game {
  name: string;
  url: string;
  description: string;
}

const games: Game[] = [
  { name: "2048", url: "https://play2048.co/", description: "Slide tiles to reach 2048" },
  { name: "Asteroids", url: "https://freeasteroids.org/", description: "Classic space shooter" },
  { name: "Breakout", url: "https://www.google.com/search?q=atari+breakout", description: "Brick-breaking classic" },
  { name: "Chess", url: "https://www.chess.com/play/computer", description: "Play chess vs computer" },
  { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/", description: "Click cookies endlessly" },
  { name: "Cut the Rope", url: "https://cuttherope.io/", description: "Feed candy to Om Nom" },
  { name: "Dinosaur Game", url: "chrome://dino", description: "Chrome's offline runner" },
  { name: "Doodle Jump", url: "https://doodlejump.io/", description: "Jump higher and higher" },
  { name: "Flappy Bird", url: "https://flappybird.io/", description: "Navigate through pipes" },
  { name: "Geometry Dash", url: "https://geometrydashonline.io/", description: "Rhythm-based platformer" },
  { name: "HexGL", url: "https://hexgl.bkcore.com/play/", description: "Futuristic racing game" },
  { name: "Minesweeper", url: "https://minesweeper.online/", description: "Clear mines strategically" },
  { name: "Pac-Man", url: "https://www.google.com/logos/2010/pacman10-i.html", description: "Classic arcade maze" },
  { name: "Retro Bowl", url: "https://retrobowl.me/", description: "Retro football management" },
  { name: "Slope", url: "https://slopegame.io/", description: "Roll down the slope" },
  { name: "Snake", url: "https://playsnake.org/", description: "Classic snake game" },
  { name: "Subway Surfers", url: "https://padlet-uploads-usc1.storage.googleapis.com/4369598499/7862e21c34161feeaed746c416f83c09/clSINGLEFILE.html", description: "Endless runner (HTML version)" },
  { name: "Tetris", url: "https://tetris.com/play-tetris", description: "Classic block puzzle" },
  { name: "Wordle", url: "https://www.nytimes.com/games/wordle/", description: "Daily word puzzle" },
  { name: "Zombs Royale", url: "https://zombsroyale.io/", description: "Battle royale .io game" },
];

const HtmlGames = () => {
  return (
    <section id="html-games" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Gamepad2 className="w-8 h-8 text-[hsl(var(--nuke-cyan))]" />
          <h2 className="text-3xl font-bold text-[hsl(var(--nuke-cyan))]">
            🎮 HTML GAMES [A-Z]
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Curated HTML5 games sorted alphabetically. Click to deploy.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <a
              key={game.name}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="nuke-card rounded-lg p-4 flex items-start justify-between group cursor-pointer"
            >
              <div>
                <h3 className="text-foreground font-bold text-sm group-hover:text-primary transition-colors">
                  {game.name}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">{game.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HtmlGames;
