export interface BackgroundConfig {
  enabled: boolean;
  imageUrl: string;
  opacity: number; // 0 to 100, default around 8-15 for soft watermark
  blur: number; // in pixels (e.g. 0 to 8)
  overlayColor: string; // 'slate', 'emerald', 'white'
  patternOverlay: boolean; // subtle grid/dots
}

export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  enabled: true,
  // Hospital facade / medical atmosphere image
  imageUrl: 'https://upload.wikimedia.org/wikipedia/th/1/12/Logo_of_Vachira_Phuket_Hospital.jpg',
  opacity: 8,
  blur: 0,
  overlayColor: 'slate',
  patternOverlay: true,
};
