export const checkFieldInLocalStorage = (key) => {
    const value = localStorage.getItem(key)
    return value !== null
}

export const storeFieldInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}