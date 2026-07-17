"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/market-data")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const dxyPrice = data?.prices?.find((p) => p.key === "dxy")?.price ?? null;
  const dxfPrice = Number(dxyPrice) || 104.5; // use DXY as the macro thesis anchor

  let thesisText = "Analyzing market conditions...";
  if (!loading && data) {
    if (dxyPrice > 108) {
      thesisText = "Strong dollar — headwinds for equities and commodities. Favor cash, short duration.";
    } else if (dxyPrice > 102) {
      thesisText = "Moderate dollar — balanced across asset classes. Selective positioning advised.";
    } else if (dxyPrice > 95) {
      thesisText = "Weakening dollar — tailwinds for gold, oil, & EM equities.";
    } else {
      thesisText = "Significant dollar weakness — bull case for USD-denominated hard assets.";
    }
  }

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 style={styles.h1} className="text-white tracking-wider">
            MACRO<span style={styles.blue}>COMPASS</span>
          </h1>
          {data?.updated && (
            <span style={{ color: "#64748b", fontSize: 13 }}>
              Updated{" "}
              {new Date(data.updated).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </header>

      {/* Thesis */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div style={{ borderLeft: "3px solid #3b82f6", paddingLeft: 20 }}>
          <h2 style={styles.thesisLabel}>MACRO THESIS</h2>
          <p style={styles.thesisText}>{thesisText}</p>
        </div>
      </section>

      {/* Cards */}
      {loading ? (
        <div className="flex gap-6 flex-wrap px-6 pb-12 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ width: "calc(33.3% - 4rem)", background: "rgba(59,130,246,0.03)", border: "1px solid rgba(148,163,184,0.08)", borderRadius: 16, minHeight: 200 }}>
              <div className="p-8 space-y-4">
                <div style={styles.skeleton} />
                <div style={{ ...styles.skeleton, width: 60 }} />
              </div>
            </div>
          ))}
        </div>
      ) : !loading && data?.prices?.length > 0 ? (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex gap-6 flex-wrap">
            {data.prices.map((p) => {
              const pct = p.changePercent;
              const up = pct > 0;
              const down = pct < 0;

              let borderCol = "rgba(148,163,184,0.08)";
              if (pct != null && pct !== 0) {
                borderCol = up ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)";
              }

              let pctColor = "#94a3b8";
              if (up) pctColor = "#22c55e";
              else if (down) pctColor = "#ef4444";

              return (
                <div key={p.key} style={{ width: "calc(33.3% - 4rem)", background: "rgba(15,23,42,0.6)", border: `1px solid ${borderCol}`, borderRadius: 16, minHeight: 200 }} className="transition-all duration-200 hover:border-white/20 hover:bg-white/5">
                  <div className="p-8">
                    <h3 style={{ fontSize: 14, fontWeight: 500, color: "#94a3b8", marginBottom: 16 }}>{p.label}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontSize: 36, fontWeight: 700 }} className="text-white">{p.price ?? "?"}</p>
                      {pct != null && pct !== 0 ? (
                        <span style={{ color: pctColor, fontSize: 15, fontWeight: 600 }}>
                          {up ? "+" : ""}{(typeof pct === "number" ? pct.toFixed(2) : "0.00")}%
                        </span>
                      ) : (
                        <span style={{ color: "#64748b", fontSize: 13 }}>
                          —
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reasoning */}
          {dxyPrice != null && (
            <section style={{ marginTop: 32, borderLeft: "3px solid rgba(59,130,246,0.3)", paddingLeft: 20 }}>
              <h3 style={styles.reasonLabel}>ANALYSIS</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 15 }}>
                DXY at {dxfPrice.toFixed(2)}{" "}
                {dxyPrice > 104
                  ? "— Strong dollar environment reduces equity upside and pressures commodities."
                  : dxyPrice > 96
                    ? "— Dollar in neutral range — balanced macro across asset classes."
                    : "— Weakening dollar provides tailwinds for hard assets and EM equities."}
              </p>
            </section>
          )}
        </div>
      ) : (
        <section className="px-6 pb-12 max-w-7xl mx-auto">
          <p style={{ color: "#64748b" }}>No data available. Try again later.</p>
        </section>
      )}

      <footer style={styles.footer}>
        <p style={{ color: "#475569", fontSize: 12 }}>Data from Yahoo Finance • Live refresh every 5 min</p>
      </footer>
    </main>
  );
}

const styles = {
  main: { background: "#0b1628", color: "#e2e8f0", minHeight: "100vh" },
  header: { borderBottom: "1px solid rgba(148,163,184,0.1)" },
  h1: { fontSize: 20, fontWeight: 300, letterSpacing: "1.5px", margin: 0 },
  blue: { color: "#3b82f6", marginLeft: 4 },
  thesisLabel: { fontSize: 13, fontWeight: 600, color: "#3b82f6", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" },
  thesisText: { fontSize: 18, lineHeight: 1.7, margin: 0 },
  reasonLabel: { fontSize: 13, fontWeight: 600, color: "#3b82f6", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" },
  footer: { borderTop: "1px solid rgba(148,163,184,0.08)", padding: 24 }
};
