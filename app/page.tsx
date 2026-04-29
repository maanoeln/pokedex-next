"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PokemonCard } from "@/components/PokemonCard";
import { SearchInput } from "@/components/SearchInput";
import { Pagination } from "@/components/Pagination";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { POKEMON_PER_PAGE } from "@/lib/constants";

const BASE = "https://pokeapi.co/api/v2";
interface PokemonEntry {
  name: string;
  id: number;
}

export default function HomePage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pokemon, setPokemon] = useState<PokemonEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<PokemonEntry[] | null>(
    null,
  );
  const [searching, setSearching] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offset = (page - 1) * POKEMON_PER_PAGE;
    fetch(`${BASE}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`)
      .then((r) => r.json())
      .then((d) => {
        setPokemon(
          d.results.map((p: { name: string; url: string }) => ({
            name: p.name,
            id: parseInt(p.url.split("/").filter(Boolean).pop()!),
          })),
        );
        setTotal(d.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(async () => {
      if (!search.trim()) {
        setSearchResults(null);
        return;
      }
      setSearching(true);
      try {
        const d = await fetch(`${BASE}/pokemon?limit=100000`).then((r) =>
          r.json(),
        );
        const q = search.toLowerCase().trim();
        const filtered = d.results
          .filter((p: { name: string }) => p.name.includes(q))
          .slice(0, 48)
          .map((p: { name: string; url: string }) => ({
            name: p.name,
            id: parseInt(p.url.split("/").filter(Boolean).pop()!),
          }));
        setSearchResults(filtered);
      } catch {
        setSearchResults([]);
      }
      setSearching(false);
    }, 350);
    return () => clearTimeout(searchTimer.current);
  }, [search]);

  function handlePageChange(p: number) {
    setPage(p);
    setLoading(true);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const displayList = searchResults ?? pokemon;
  const totalPages = Math.ceil(total / POKEMON_PER_PAGE);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <div ref={topRef} />
      <main
        style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px 60px" }}
      >
        <div style={{ marginBottom: 28 }}>
          <SearchInput value={search} onChange={setSearch} />
        </div>

        {searching || loading ? (
          <LoadingSpinner />
        ) : searchResults?.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>😕</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
              No Pokémon found for {'"'}
              {search}
              {'"'}
            </p>
          </div>
        ) : (
          <>
            {searchResults && (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginBottom: 12,
                }}
              >
                {searchResults.length} results for {'"'}
                {search}
                {'"'}
              </p>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: 12,
                marginBottom: 8,
              }}
            >
              {displayList.map((p, i) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  index={i}
                  onClick={() => router.push(`/pokemon/${p.name}`)}
                />
              ))}
            </div>
            {!searchResults && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
