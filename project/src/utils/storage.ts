// LocalStorage utility functions with error handling

export class StorageManager {
  private static instance: StorageManager
  private prefix: string

  private constructor(prefix: string = 'sailing-app') {
    this.prefix = prefix
  }

  public static getInstance(prefix?: string): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager(prefix)
    }
    return StorageManager.instance
  }

  private getKey(key: string): string {
    return `${this.prefix}-${key}`
  }

  public set<T>(key: string, value: T): boolean {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(this.getKey(key), serializedValue)
      return true
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      return false
    }
  }

  public get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key))
      if (item === null) {
        return defaultValue || null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue || null
    }
  }

  public remove(key: string): boolean {
    try {
      localStorage.removeItem(this.getKey(key))
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  }

  public clear(): boolean {
    try {
      // Only clear items with our prefix
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }

  public exists(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null
  }

  public size(): number {
    let size = 0
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        size += localStorage.getItem(key)?.length || 0
      }
    })
    return size
  }
}

// Export singleton instance
export const storage = StorageManager.getInstance()

// Specific storage helpers
export const userStorage = {
  saveUser: (userData: any) => storage.set('user', userData),
  getUser: () => storage.get('user'),
  clearUser: () => storage.remove('user')
}

export const sailingStorage = {
  saveSailingData: (data: any) => storage.set('sailing-data', data),
  getSailingData: () => storage.get('sailing-data'),
  clearSailingData: () => storage.remove('sailing-data')
}

export const navigationStorage = {
  saveNavigation: (navData: any) => storage.set('navigation', navData),
  getNavigation: () => storage.get('navigation'),
  clearNavigation: () => storage.remove('navigation')
}