import { useEffect, useRef } from 'react'

function useEffectOnlyOnUpdate(callback) {
    const firstUpdate = useRef(true)

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
        } else {
            callback()
        }
    }, [callback])
}

export default useEffectOnlyOnUpdate