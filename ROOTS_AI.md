# ROOTS.AI soil system

The original dashboard shell, map and satellite viewer are retained. Every application route now uses the soil workspace instead of the coastal incident engine. No coastal events, bloom classifications or water-quality predictions seed the soil system.

Coverage: all seven UAE emirates and Al Dhafra / Western Region. Region bounding boxes are approximate catalogue search areas, not administrative boundaries. Each sample records its actual represented area.

Implemented: region selection, custom site bounds, Sentinel-2 catalogue queries for the last 30 days, laboratory sample validation and persistence, JSON imports, optional HTTPS feed polling every 60 seconds while open, dated stock calculations, evidence age/missing-data review flags, statement export and field-assessed restoration review. All data is browser-local. The map background is the original 2021 imagery.

Still required for an operational recognition service: a deployed soil raster processor, soil ground-truth dataset, trained and spatially validated classifier, sensor endpoints, server persistence, automated scheduled reports and calibrated uncertainty. The original Python coastal API remains upstream reference code and is not connected to the hosted soil app. Satellite 813 has no real feed here. Do not describe catalogue searches as live soil classification.

Stock method: depth cm × dry bulk density g/cm3 × organic carbon percent × represented hectares = Mg C. A single sample is extrapolated uniformly through its layer and area. It does not estimate monthly capture. Uncertainty and change are left undetermined. The export includes source sample, date, method and review notes.

Run: npm ci and npm run dev in apps/web. Static deployment: BLUEBAN_STATIC=1 and NEXT_PUBLIC_BASE_PATH=/BlueBan-813 npm run build; configured output is apps/web/.next-static. Preserve the original MIT attribution.
