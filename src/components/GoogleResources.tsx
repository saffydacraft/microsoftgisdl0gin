import { useState } from "react";
import { FileText, Plus, ExternalLink, X } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  url: string;
  type: "sites" | "docs" | "slides";
}

const defaultResources: Resource[] = [
  { id: "1", title: "Google Sites Games Hub", url: "https://sites.google.com/", type: "sites" },
  { id: "2", title: "Game Collection Slides", url: "https://docs.google.com/presentation/", type: "slides" },
  { id: "3", title: "Game Links Doc", url: "https://docs.google.com/document/", type: "docs" },
];

const typeColors: Record<string, string> = {
  sites: "text-primary",
  docs: "text-accent",
  slides: "text-[hsl(var(--nuke-cyan))]",
};

const GoogleResources = () => {
  const [resources, setResources] = useState<Resource[]>(defaultResources);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState<Resource["type"]>("sites");

  const addResource = () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    setResources([...resources, {
      id: Date.now().toString(),
      title: newTitle.trim(),
      url: newUrl.trim().startsWith("http") ? newUrl.trim() : "https://" + newUrl.trim(),
      type: newType,
    }]);
    setNewTitle("");
    setNewUrl("");
    setShowAdd(false);
  };

  const removeResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <section id="google" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-accent" />
          <h2 className="text-3xl font-bold text-accent">
            ⚠ GOOGLE RESOURCES
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Google Sites, Docs, and Slides loaded with games. Add your own links below.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {resources.map((r) => (
            <div key={r.id} className="nuke-card rounded-lg p-4 group relative">
              <button
                onClick={() => removeResource(r.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <span className={`text-xs uppercase font-bold tracking-widest ${typeColors[r.type]}`}>
                {r.type}
              </span>
              <h3 className="text-foreground font-bold mt-2 mb-3 text-sm">{r.title}</h3>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nuke-btn inline-flex items-center gap-2 px-4 py-2 rounded text-xs"
              >
                <ExternalLink className="w-3 h-3" /> OPEN
              </a>
            </div>
          ))}
        </div>

        {showAdd ? (
          <div className="nuke-card rounded-lg p-6">
            <h3 className="text-foreground font-bold mb-4 text-sm">+ ADD RESOURCE</h3>
            <div className="grid gap-3 sm:grid-cols-3 mb-4">
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" className="nuke-input px-3 py-2 rounded text-sm" />
              <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="URL" className="nuke-input px-3 py-2 rounded text-sm" />
              <select value={newType} onChange={e => setNewType(e.target.value as Resource["type"])} className="nuke-input px-3 py-2 rounded text-sm">
                <option value="sites">Sites</option>
                <option value="docs">Docs</option>
                <option value="slides">Slides</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={addResource} className="nuke-btn px-4 py-2 rounded text-xs">ADD</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded text-xs text-muted-foreground border border-border hover:border-primary transition-colors">CANCEL</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAdd(true)} className="nuke-btn px-6 py-3 rounded-md flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> ADD RESOURCE
          </button>
        )}
      </div>
    </section>
  );
};

export default GoogleResources;
