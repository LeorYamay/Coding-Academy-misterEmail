import { useEffect, useRef } from 'react'

function useEffectOnUpdate(callback,dependancies) {
    const firstUpdate = useRef(true)

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        } else {
            return callback()
        }
    }, dependancies)
}

export default useEffectOnUpdate