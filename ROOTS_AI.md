# ROOTS.AI soil adaptation

The home page and /soil provide a blue presentation workspace for slides 7–10 of the supplied ROOTS.AI deck. Includes evidence status, editable carbon stock calculations, JSON statement export and researcher-selected restoration priorities.

## Data status
This is a presentation prototype, not a deployed live soil recognition model. No soil sensor credentials or ground-truth training data were supplied. Coastal classifiers must not be used as soil classifiers. Existing satellite routes and acquisition code remain available unchanged: Sentinel-2 is the original primary source; Satellite 813 is simulated. Existing coastal routes remain reference tools and retain their original labels.

The default calculation is 1 ha × 100 cm × 0.5 g/cm³ × 2% = 100 Mg C. CO2-equivalent stock uses 44/12. It is not sequestration or a credit. No uncertainty is invented.

## Run
From apps/web run npm ci and npm run dev. The soil page needs no backend; inherited satellite functionality follows the original README setup.

## Required before live use
Connect timestamped soil observations, land/cloud masks and field samples; train and spatially validate a soil-specific model; provide uncertainty and a review workflow. Weekly alerts and monthly scheduled reporting require a backend implementation.

Original MIT attribution is retained in LICENSE. The PowerPoint is not redistributed in this repository.
