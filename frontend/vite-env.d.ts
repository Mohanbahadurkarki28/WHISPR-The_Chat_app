/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STREAM_API_KEY: string;
  // add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
