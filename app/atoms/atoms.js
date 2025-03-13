import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

const asyncKeymapsAtom = atom(
    loadable(async () => {
        const response = await fetch('/api/keymaps')
        const data = await response.json()
    })
)
export const loadableKeymapsAtom = loadable(asyncKeymapsAtom)