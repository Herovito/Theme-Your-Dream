# Productiecontrole

Gebruik de actuele [deploymentchecklist](DEPLOYMENT_CHECKLIST.md). De build publiceert uitsluitend de bestanden uit `.vercel/output`; publiceer niet de repositoryhoofdmap.

Indexering vereist zowel een production-build als `SITE_LIVE=true`. Een nieuwe build is nodig na een wijziging van deze omgevingsvariabele.
