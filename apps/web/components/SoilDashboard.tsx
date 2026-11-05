"use client";
import { useState } from "react";
import Link from "next/link";

export default function SoilDashboard() {
  const [area, setArea] = useState(1);
  const [depth, setDepth] = useState(100);
  const [density, setDensity] = useState(0.5);
  const [carbon, setCarbon] = useState(2);
  const [condition, setCondition] = useState("uncertain");
  const stock = area * depth * density * carbon;
  const valid = [area, depth, density, carbon].every(Number.isFinite) && area > 0 && depth > 0 && density > 0 && carbon >= 0 && carbon <= 100;
  const action = condition === "degraded" ? "Inspect the site and assess restoration suitability." : condition === "healthy" ? "Protect the habitat and continue monitoring." : "Collect field samples before deciding on intervention.";
  function download() {
    const blob = new Blob([JSON.stringify({status:"illustrative, unreviewed", areaHa:area, depthCm:depth, dryBulkDensity: density, organicCarbonPercent:carbon, stockMgC:stock, co2EquivalentMg:stock*44/12, evidenceDate:null, uncertainty:null, rate:null, modelVersion:"calculator-v1", recommendation:action}, null, 2)], {type:"application/json"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="roots-ai-carbon-statement.json"; a.click(); URL.revokeObjectURL(url);
  }
  return <div className="text-ink p-6 space-y-8">
    <header><p className="text-sky-300">ROOTS.AI · Satellite 813 research prototype</p><h1 className="text-4xl font-bold mt-2">Live Soil Recognition</h1><p className="mt-4 max-w-3xl">Soil evidence, carbon stock and restoration decisions. Live soil sensors and a validated soil classifier are not connected yet. Satellite 813 remains simulated in the inherited satellite explorer.</p><nav className="flex gap-6 mt-6"><Link href="/satellite">Satellite explorer</Link><Link href="/">Dashboard</Link></nav></header>
    <section><p className="text-sky-300">07 · Measurements anchor AI</p><h2 className="text-2xl font-bold">Smart Carbon Measuring System</h2><p className="mt-3">Field cores supply measured carbon and dry bulk density. Sentinel-2 imagery supplies site context; a soil model still requires local calibration and held-out validation. Coastal bloom predictions are not soil classifications.</p></section>
    <section><p className="text-sky-300">08 · Live monitoring and weekly checks</p><h2 className="text-2xl font-bold">Evidence status</h2><dl className="grid gap-4 sm:grid-cols-3 mt-4"><div><dt>Soil sensor feed</dt><dd>Not connected</dd></div><div><dt>Latest soil evidence</dt><dd>No field samples supplied</dd></div><div><dt>Weekly review</dt><dd>Sampling and disturbance review pending</dd></div></dl></section>
    <section><p className="text-sky-300">09 · Monthly carbon statement</p><h2 className="text-2xl font-bold">Illustrative stock calculator</h2><div className="grid sm:grid-cols-4 gap-4 mt-4">{([["Area (ha)",area,setArea],["Depth (cm)",depth,setDepth],["Dry density (g/cm³)",density,setDensity],["Organic carbon (%)",carbon,setCarbon]] as const).map(([label,value,set])=><label key={label}>{label}<input className="block w-full mt-2 p-3 bg-[#174576] rounded" type="number" min="0" step="any" value={Number.isNaN(value)?"":value} onChange={e=>set(e.target.valueAsNumber)}/></label>)}</div><p className="text-3xl mt-5" aria-live="polite">{valid ? `${stock.toFixed(2)} Mg C · ${(stock*44/12).toFixed(2)} Mg CO₂ equivalent` : "Enter valid positive dimensions and carbon between 0 and 100%."}</p><p className="mt-3">Existing stock under uniform layer assumptions, not monthly capture. Uncertainty, evidence date and sequestration rate are undetermined. Default values reproduce the slide’s 100 Mg C example.</p><button disabled={!valid} onClick={download} className="mt-4 p-3 border rounded disabled:opacity-40">Download illustrative statement</button></section>
    <section><p className="text-sky-300">10 · Restoration priorities</p><h2 className="text-2xl font-bold">Where should we act next?</h2><label className="block mt-4">Researcher-assessed condition <select className="bg-[#174576] p-3 ml-3" value={condition} onChange={e=>setCondition(e.target.value)}><option value="uncertain">Uncertain evidence</option><option value="degraded">Degraded habitat</option><option value="healthy">Healthy habitat</option></select></label><p className="mt-4" aria-live="polite">{action}</p><p className="mt-3">Specialist review required. Carbon stock alone does not determine planting or compost application.</p></section>
  </div>;
}

