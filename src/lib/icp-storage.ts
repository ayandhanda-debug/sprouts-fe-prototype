export const SAVED_ICP_STORAGE_KEY = 'sprouts.saved.custom.icps';

export type SavedIcpSource = 'db-search' | 'manual';

export interface SavedIcp {
  id: string;
  name: string;
  source: SavedIcpSource;
  createdAt: string;
  companyQuery: string;
  filters: string[];
  signals: string[];
  attributeSelections?: string[];
}

const safeParse = (raw: string | null): SavedIcp[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as SavedIcp[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => Boolean(item?.id && item?.name));
  } catch {
    return [];
  }
};

export const getSavedIcps = (): SavedIcp[] => {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(SAVED_ICP_STORAGE_KEY));
};

export const saveSavedIcps = (icps: SavedIcp[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SAVED_ICP_STORAGE_KEY, JSON.stringify(icps));
};

export const addSavedIcp = (icp: SavedIcp): SavedIcp[] => {
  const existing = getSavedIcps();
  const next = [icp, ...existing];
  saveSavedIcps(next);
  return next;
};
