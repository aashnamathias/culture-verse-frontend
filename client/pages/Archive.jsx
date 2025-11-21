import { useMemo, useState } from "react";

type Artifact = {
  id: string;
  name: string;
  state: string;
  imageUrl: string;
};

const ARTIFACT_DATA: Artifact[] = [
  { id: "1", name: "Blue Pottery Vase", state: "Rajasthan", imageUrl: "https://placehold.co/400x300?text=Rajasthan" },
  { id: "2", name: "Channapatna Toy", state: "Karnataka", imageUrl: "https://placehold.co/400x300?text=Karnataka" },
  { id: "3", name: "Madhubani Painting", state: "Bihar", imageUrl: "https://placehold.co/400x300?text=Bihar" },
  { id: "4", name: "Terracotta Horse", state: "West Bengal", imageUrl: "https://placehold.co/400x300?text=West+Bengal" },
  { id: "5", name: "Bidriware Box", state: "Telangana", imageUrl: "https://placehold.co/400x300?text=Telangana" },
  { id: "6", name: "Phulkari Shawl", state: "Punjab", imageUrl: "https://placehold.co/400x300?text=Punjab" },
  { id: "7", name: "Pashmina Stole", state: "Jammu and Kashmir", imageUrl: "https://placehold.co/400x300?text=J%26K" },
  { id: "8", name: "Warli Canvas", state: "Maharashtra", imageUrl: "https://placehold.co/400x300?text=Maharashtra" },
  { id: "9", name: "Kalamkari Scroll", state: "Andhra Pradesh", imageUrl: "https://placehold.co/400x300?text=Andhra+Pradesh" },
  { id: "10", name: "Pattachitra Plate", state: "Odisha", imageUrl: "https://placehold.co/400x300?text=Odisha" },
];

const STATE_GRID = [
  "Rajasthan",
  "Gujarat",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Kerala",
  "Telangana",
  "Andhra Pradesh",
  "West Bengal",
  "Assam",
  "Odisha",
  "Bihar",
  "Punjab",
  "Haryana",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Jammu and Kashmir",
];

const Archive = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const filteredArtifacts = useMemo(() => {
    if (!hoveredState) return ARTIFACT_DATA;
    return ARTIFACT_DATA.filter((artifact) => artifact.state === hoveredState);
  }, [hoveredState]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
        <section className="w-full rounded-2xl bg-muted/40 p-6 shadow-sm ring-1 ring-border/40 lg:w-2/5">
          <header className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Interactive Map</p>
            <h2 className="text-2xl font-semibold">Tap a state to explore</h2>
            <p className="text-sm text-muted-foreground">Hover on any state to filter the archive list.</p>
          </header>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {STATE_GRID.map((state) => {
              const isActive = hoveredState === state;

              return (
                <button
                  key={state}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  className={`rounded-xl border px-3 py-4 text-left text-sm transition-all ${
                    isActive
                      ? "border-primary bg-primary/15 text-primary-foreground"
                      : "border-border/60 bg-card/60 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
                  }`}
                >
                  <span className="font-medium">{state}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="w-full rounded-2xl bg-muted/20 p-6 shadow-sm ring-1 ring-border/40 lg:w-3/5">
          <header className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Archive</p>
              <h2 className="text-2xl font-semibold">
                {hoveredState ? `${hoveredState} crafts` : "All crafts across India"}
              </h2>
            </div>
            {hoveredState && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {filteredArtifacts.length} listed
              </span>
            )}
          </header>

          {!hoveredState && (
            <p className="mb-6 text-sm text-muted-foreground">Hover over a state to filter the archive.</p>
          )}

          {hoveredState && filteredArtifacts.length === 0 && (
            <div className="rounded-xl border border-dashed border-border/80 bg-card/60 p-6 text-center">
              <p className="text-sm text-muted-foreground">No artifacts recorded for {hoveredState} yet.</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredArtifacts.map((artifact) => (
              <article
                key={artifact.id}
                className="group overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs transition hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="relative h-32 w-full overflow-hidden bg-muted">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-medium text-foreground">
                    {artifact.state}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold">{artifact.name}</h3>
                  <p className="text-xs text-muted-foreground">{artifact.state}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Archive;