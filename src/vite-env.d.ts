interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
