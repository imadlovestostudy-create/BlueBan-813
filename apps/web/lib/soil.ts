export type SoilSample = {id:string; site:string; date:string; depthCm:number; density:number; carbonPct:number; areaHa:number; moisturePct:number|null; ph:number|null; lab:string};
export type SoilState = {version:1; site:string; bbox:[number,number,number,number]; samples:SoilSample[]; condition:string; review:string; feed:string};
export const emptySoil:SoilState={version:1,site:"",bbox:[54.2,24.2,54.4,24.4],samples:[],condition:"uncertain",review:"",feed:""};
export function validateSample(x:unknown):SoilSample {
 const s=x as SoilSample;
 if(!s || typeof s.id!=="string" || !s.id.trim() || typeof s.site!=="string" || !s.site.trim() || typeof s.lab!=="string" || !s.lab.trim() || !Number.isFinite(Date.parse(s.date)) || Date.parse(s.date)>Date.now()) throw Error("Sample needs an ID, site, laboratory/source and a valid non-future evidence date.");
 for(const k of ["depthCm","density","areaHa"] as const) if(!Number.isFinite(s[k]) || s[k]<=0) throw Error(`${k} must be positive.`);
 if(!Number.isFinite(s.carbonPct)||s.carbonPct<0||s.carbonPct>100) throw Error("Organic carbon must be 0–100%.");
 if(s.moisturePct!==null && (!Number.isFinite(s.moisturePct)||s.moisturePct<0||s.moisturePct>100)) throw Error("Moisture must be 0–100% or null.");
 if(s.ph!==null && (!Number.isFinite(s.ph)||s.ph<0||s.ph>14)) throw Error("pH must be 0–14 or null.");
 return {id:s.id,site:s.site,date:s.date,lab:s.lab,depthCm:s.depthCm,density:s.density,areaHa:s.areaHa,carbonPct:s.carbonPct,moisturePct:s.moisturePct,ph:s.ph};
}
export function stock(s:SoilSample){return s.depthCm*s.density*s.carbonPct*s.areaHa;}
export function sampleAlerts(s:SoilSample,now=Date.now()) { const a:string[]=[]; if(now-Date.parse(s.date)>7*86400000)a.push("Evidence older than 7 days: schedule review"); if(s.moisturePct===null)a.push("Soil moisture evidence missing"); if(s.ph===null)a.push("Soil pH evidence missing"); return a; }
export function recommendation(condition:string,hasEvidence:boolean){return !hasEvidence || condition==="uncertain" ? "Collect representative soil samples before intervention." : condition==="degraded" ? "Inspect degradation causes and assess restoration suitability with a specialist." : "Protect the site and continue monitoring.";}
