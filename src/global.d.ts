declare interface Window {
  Telegram: any
}

declare var module: {
  hot?: {
    accept(dependencies?: string | string[], callback?: () => void): void
    dispose(callback: () => void): void
  }
}
