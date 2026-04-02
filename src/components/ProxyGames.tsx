import { useState } from "react";
import { Radiation, Globe, ExternalLink } from "lucide-react";

const ProxyGames = () => {
  const [url, setUrl] = useState("");
  const [proxyUrl, setProxyUrl] = useState("");

  const handleLaunch = () => {
    if (!url.trim()) return;
    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    setProxyUrl(finalUrl);
  };

  return (
    <section id="proxy" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Radiation className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-primary nuke-glow">
            ☢ PROXY GAMES
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Enter any unblocked game URL below to launch it in the reactor core.
        </p>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLaunch()}
            placeholder="https://example.com/game"
            className="nuke-input flex-1 px-4 py-3 rounded-md text-sm"
          />
          <button onClick={handleLaunch} className="nuke-btn px-6 py-3 rounded-md flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4" />
            LAUNCH
          </button>
        </div>

        {proxyUrl && (
          <div className="nuke-card rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="text-xs text-muted-foreground truncate max-w-[80%]">{proxyUrl}</span>
              <a href={proxyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <iframe
              src={proxyUrl}
              title="Proxy Game"
              className="w-full h-[500px] border-0"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        )}

        {!proxyUrl && (
          <div className="nuke-card rounded-lg p-12 text-center">
            <Radiation className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-sm">REACTOR IDLE — Enter a URL to begin</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProxyGames;
