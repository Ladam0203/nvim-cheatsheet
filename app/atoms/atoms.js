import {atom} from 'jotai'
import {loadable} from 'jotai/utils'

const asyncMappingsAtom = atom(
    loadable(async () => {
        const response = await fetch('/api/mappings')
        return await response.json()
    })
)
export const loadableMappingsAtom = loadable(asyncMappingsAtom)