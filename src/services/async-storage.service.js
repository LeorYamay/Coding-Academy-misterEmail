import AsyncLock from 'async-lock'
const lock = new AsyncLock()

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

const storageActionsTimeFrame = 50
const postRequests = {}
async function post(entityType, newEntity) {
    if (!postRequests[entityType]) {
        postRequests[entityType] = []
    }

    return new Promise((resolve, reject) => {
        postRequests[entityType].push({ resolve, reject, newEntity })

        setTimeout(async () => {
            if (postRequests[entityType].length > 0) {
                await lock.acquire(entityType, async () => {
                    const entities = await query(entityType)
                    postRequests[entityType].forEach(({ resolve, newEntity }) => {
                        newEntity = { ...newEntity ,id:_makeId()}
                        entities.push(newEntity)
                        resolve(newEntity)
                    })
                    _save(entityType, entities)
                    delete postRequests[entityType]
                })
            }
        }, storageActionsTimeFrame)
    })
}

const putRequests = {}
async function put(entityType, updatedEntity) {
    if (!putRequests[entityType]) {
        putRequests[entityType] = []
    }

    return new Promise((resolve, reject) => {
        putRequests[entityType].push({ resolve, reject, updatedEntity });

        setTimeout(async () => {
            if (putRequests[entityType].length > 0) {
                await lock.acquire(entityType, async () => {
                    const entities = await query(entityType);
                    putRequests[entityType].forEach(({ resolve, updatedEntity }) => {
                        const idx = entities.findIndex(entity => entity.id === updatedEntity.id);
                        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`)
                        entities.splice(idx, 1, updatedEntity);
                        resolve(updatedEntity)
                    })
                    _save(entityType, entities)
                    delete putRequests[entityType]
                })
            }
        }, storageActionsTimeFrame)
    })
}

const removeRequests ={}
async function remove(entityType, entityId) {
    if (!removeRequests[entityType]) {
        removeRequests[entityType] = []
    }

    return new Promise((resolve, reject) => {
        removeRequests[entityType].push({ resolve, reject, entityId })

        setTimeout(async () => {
            if (removeRequests[entityType].length > 0) {
                await lock.acquire(entityType, async () => {
                    const entities = await query(entityType)
                    removeRequests[entityType].forEach(({ resolve, entityId }) => {
                        const idx = entities.findIndex(entity => entity.id === entityId)
                        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
                        entities.splice(idx, 1)
                        resolve()
                    })
                    _save(entityType, entities)
                    delete removeRequests[entityType]
                })
            }
        }, storageActionsTimeFrame)
    })
}


// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}