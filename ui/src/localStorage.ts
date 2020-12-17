export const loadState = (itemName: string) => {
    try {
        const serializedState = localStorage.getItem(itemName)

        if (serializedState === null) {
            return undefined
        }

        return JSON.parse(serializedState)

    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const saveState = (itemName: string, state: object) => {
    try {
        const serializedState = JSON.stringify(state)

        localStorage.setItem(itemName, serializedState)

    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const deleteState = (itemName: string) => {
    try {
        localStorage.removeItem(itemName)
    } catch (error) {
        console.log(error)
        return undefined
    }
}