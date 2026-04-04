import { useState } from "react";
import { Radiation, Lock } from "lucide-react";

const PasswordGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "SAFFYMADETIS123") {
      sessionStorage.setItem("na_unlocked", "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background scan-overlay flex flex-col items-center justify-center p-4">
      <div className="hazard-stripe h-2 w-full absolute top-0 left-0" />
      <Radiation className="w-16 h-16 text-primary nuke-glow mb-6" />
      <h1 className="text-3xl font-black text-primary nuke-glow tracking-wider mb-2">ACCESS RESTRICTED</h1>
      <p className="text-muted-foreground text-xs tracking-widest uppercase mb-8">Enter authorization code</p>
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className={`w-full pl-10 pr-4 py-3 bg-card border rounded font-mono text-sm tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-destructive animate-pulse" : "border-border"}`}
            autoFocus
          />
        </div>
        {error && <p className="text-destructive text-xs tracking-widest text-center">☢ ACCESS DENIED ☢</p>}
        <button type="submit" className="bg-primary text-primary-foreground font-bold py-3 rounded tracking-widest text-sm hover:opacity-90 transition-opacity">
          AUTHORIZE
        </button>
      </form>
      <div className="hazard-stripe h-2 w-full absolute bottom-0 left-0" />
    </div>
  );
};

export default PasswordGate;
