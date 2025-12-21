const STORAGE_KEY = "fluxly_utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];

const emptyUtm = () => ({
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
});

const normalizeUtmValue = (value) => {
  if (value === null || value === undefined) return null;
  const trimmed = String(value).trim();
  return trimmed.length ? trimmed : null;
};

export const persistUtmParams = (searchParams) => {
  if (typeof window === "undefined") return null;

  const params =
    searchParams instanceof URLSearchParams
      ? searchParams
      : new URLSearchParams(searchParams || "");

  const hasAnyKey = UTM_KEYS.some((key) => params.has(key));
  if (!hasAnyKey) return null;

  const utm = {
    utm_source: normalizeUtmValue(params.get("utm_source")),
    utm_medium: normalizeUtmValue(params.get("utm_medium")),
    utm_campaign: normalizeUtmValue(params.get("utm_campaign")),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  return utm;
};

export const getStoredUtmParams = () => {
  if (typeof window === "undefined") return emptyUtm();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyUtm();
    const parsed = JSON.parse(stored);
    return {
      utm_source: normalizeUtmValue(parsed?.utm_source),
      utm_medium: normalizeUtmValue(parsed?.utm_medium),
      utm_campaign: normalizeUtmValue(parsed?.utm_campaign),
    };
  } catch {
    return emptyUtm();
  }
};
