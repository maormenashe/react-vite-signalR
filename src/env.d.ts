/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HUBS_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}