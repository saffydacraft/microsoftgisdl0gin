import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Gamepad2, ChevronDown, ChevronRight, X, AlertTriangle } from "lucide-react";

interface Game {
  id: string;
  name: string;
}

const games: Game[] = [
  { id: "cl1v1lol", name: "1v1 LOL" },
  { id: "cl2048", name: "2048" },
  { id: "cl3sliceshero", name: "3 Slices" },
  { id: "cl4thandfight", name: "4th and Fight" },
  { id: "cl5roll", name: "5 Roll" },
  { id: "cl6diff", name: "6 Diff" },
  { id: "cl7secondriddles", name: "7 Second Riddles" },
  { id: "cl8ballpool", name: "8 Ball Pool" },
  { id: "cl9lives", name: "9 Lives" },
  { id: "cl10secondchallenge", name: "10 Second Challenge" },
  { id: "clamongus", name: "Among Us" },
  { id: "clangrybirds", name: "Angry Birds" },
  { id: "clasteroids", name: "Asteroids" },
  { id: "clbaconmaydie", name: "Bacon May Die" },
  { id: "clbaldisbasics", name: "Baldis Basics" },
  { id: "clbasketbros", name: "Basket Bros" },
  { id: "clbitlife", name: "BitLife" },
  { id: "clbuildnowgg", name: "BuildNow GG" },
  { id: "clburritobison", name: "Burrito Bison" },
  { id: "clchess", name: "Chess" },
  { id: "clcookieclicker", name: "Cookie Clicker" },
  { id: "clcrazycattle3d", name: "Crazy Cattle 3D" },
  { id: "clcrossyroad", name: "Crossy Road" },
  { id: "cldeltarune", name: "Deltarune" },
  { id: "cldonkeykong", name: "Donkey Kong" },
  { id: "cldoom", name: "Doom" },
  { id: "cldriftboss", name: "Drift Boss" },
  { id: "cldrifthuntersmerge", name: "Drift Hunters" },
  { id: "clEaglercraft-Beta-1.3-Offline", name: "Eaglercraft (Minecraft)" },
  { id: "clescaperoad", name: "Escape Road" },
  { id: "clflappybird", name: "Flappy Bird" },
  { id: "clFNAF", name: "FNAF" },
  { id: "clFNAF2", name: "FNAF 2" },
  { id: "clfruitninja", name: "Fruit Ninja" },
  { id: "clgeometrydashscratch", name: "Geometry Dash" },
  { id: "clhappywheels", name: "Happy Wheels" },
  { id: "clidlebreakout", name: "Idle Breakout" },
  { id: "cljetpackjoyride", name: "Jetpack Joyride" },
  { id: "clkirbysadventure", name: "Kirbys Adventure" },
  { id: "cllearntofly", name: "Learn to Fly" },
  { id: "clmegamanx", name: "Mega Man X" },
  { id: "clminesweeperplus", name: "Minesweeper" },
  { id: "clmonkeymart", name: "Monkey Mart" },
  { id: "clninjamuffin", name: "Ninja Muffin" },
  { id: "clore", name: "OvO" },
  { id: "clqbert", name: "Q*bert" },
  { id: "clpacman", name: "Pac-Man" },
  { id: "clpizzatower", name: "Pizza Tower" },
  { id: "clretrobowl", name: "Retro Bowl" },
  { id: "clriddle", name: "Riddle School" },
  { id: "clrun3", name: "Run 3" },
  { id: "clslope", name: "Slope" },
  { id: "clsmashkarts", name: "Smash Karts" },
  { id: "clsnakeis", name: "Snake" },
  { id: "clsubwaysurfersbarcelona", name: "Subway Surfers" },
  { id: "clsupermariobros", name: "Super Mario Bros" },
  { id: "cltetris", name: "Tetris" },
  { id: "clundertalelb", name: "Undertale" },
  { id: "clvexthree", name: "Vex 3" },
  { id: "clvex4", name: "Vex 4" },
  { id: "clvex5", name: "Vex 5" },
  { id: "clwatergirl", name: "Watergirl and Fireboy" },
  { id: "clworldshardestgame", name: "Worlds Hardest Game" },
  { id: "clxtrmath", name: "Xtra Math Runner" },
  { id: "clyohoho", name: "Yo Hoho" },
  { id: "clzombsroyale", name: "Zombs Royale" },
].sort((a, b) => a.name.localeCompare(b.name));

// Pre-compute index map and groups once
const gameIndexMap = new Map(games.map((g, i) => [g.id, i + 1]));

const groupedGames = games.reduce<Record<string, Game[]>>((acc, game) => {
  const letter = game.name[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(game);
  return acc;
}, {});
const sortedLetters = Object.keys(groupedGames).sort();

const CDN_BASE = "https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files";

const HtmlGames = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [isPanicking, setIsPanicking] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Clean up blob URL on unmount or when changing games
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const cleanupBlob = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setBlobUrl(null);
  }, []);

  const toggleSection = useCallback((letter: string) => {
    setOpenSections((prev) => ({ ...prev, [letter]: !prev[letter] }));
  }, []);

  const loadGame = useCallback(async (game: Game) => {
    cleanupBlob();
    setLoading(true);
    setActiveGame(game.name);
    try {
      const res = await fetch(`${CDN_BASE}/${encodeURIComponent(game.id + ".html")}?t=${Date.now()}`);
      const html = await res.text();
      const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
      blobUrlRef.current = url;
      setBlobUrl(url);
    } catch {
      const errorHtml = "<html><body style='color:white;background:#111;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif'><h1>Failed to load. Try again.</h1></body></html>";
      const url = URL.createObjectURL(new Blob([errorHtml], { type: "text/html" }));
      blobUrlRef.current = url;
      setBlobUrl(url);
    }
    setLoading(false);
  }, [cleanupBlob]);

  const closeGame = useCallback(() => {
    cleanupBlob();
    setActiveGame(null);
  }, [cleanupBlob]);

  const handlePanic = useCallback(() => {
    cleanupBlob();
    setIsPanicking(true);
    setActiveGame(null);
  }, [cleanupBlob]);

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
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <button onClick={closeGame} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <X className="w-4 h-4" /> Back
            </button>
            <span className="text-foreground font-bold text-sm">{activeGame}</span>
            <button onClick={handlePanic} className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
              <AlertTriangle className="w-4 h-4" /> PANIC
            </button>
          </div>
          {loading || !blobUrl ? (
            <div className="flex items-center justify-center" style={{ height: "80vh" }}>
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <iframe
              src={blobUrl}
              title={activeGame}
              className="w-full rounded-lg border border-border"
              style={{ height: "80vh" }}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="html-games" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Gamepad2 className="w-8 h-8 text-[hsl(var(--nuke-cyan))]" />
          <h2 className="text-3xl font-bold text-[hsl(var(--nuke-cyan))]">🎮 HTML GAMES [A-Z]</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          {games.length} games. Click to play embedded — no new tabs, no blocked URLs.
        </p>
        <div className="space-y-1">
          {sortedLetters.map((letter) => (
            <div key={letter}>
              <button
                onClick={() => toggleSection(letter)}
                className="w-full flex items-center gap-2 py-2 px-3 text-foreground font-bold hover:bg-muted/30 rounded transition-colors text-left"
              >
                {openSections[letter] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {letter}
              </button>
              {openSections[letter] && (
                <div className="ml-6 space-y-1 pb-2">
                  {groupedGames[letter].map((game) => (
                    <button
                      key={game.id}
                      onClick={() => loadGame(game)}
                      className="block w-full text-left py-1.5 px-3 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded transition-colors text-sm"
                    >
                      math {gameIndexMap.get(game.id)} {game.name.toLowerCase()}
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
