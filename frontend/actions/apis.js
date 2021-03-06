import { fetch } from '../utils/fetch'
import { Message } from 'rctui'
import { loading } from '../utils/loading'

const Loading = loading({ position: 'initial', height: 200 })

export const API_LIST = 'API_LIST'
function handleList(status, data = Loading) {
  return {
    type: API_LIST,
    status,
    data,
  }
}

function fetchList(query) {
  return (dispatch) => {
    dispatch(handleList(0))
    fetch.get('/api', query).then((model) => {
      dispatch(handleList(1, model))
    }).catch((err) => {
      dispatch(handleList(2, err.message))
    })
  }
}

export function resetApi(callback) {
  fetch.get('/resetapi').then(res => callback())
}

export function getList(force) {
  return (dispatch, getState) => {
    const { data, status } = getState().apis
    if (status === 1 && !force && data && data.length > 0) {
      return Promise.resolve()
    }
    return dispatch(fetchList())
  }
}

export function saveApi(body, onSuccess) {
  return (dispatch, getState) => {
    fetch.post('/api', body, { dataType: 'json' }).then((model) => {
      resetApi(() => {
        if (onSuccess) onSuccess()

        // remove query
        delete model.query

        const data = getState().apis.data.filter(d => d._id !== model._id)
        dispatch(handleList(1, [model, ...data]))
        Message.success('Save successed')
      })
    }).catch((err) => {
      Message.error(err.message)
    })
  }
}

export function toggleStatus(_id, status) {
  return (dispatch, getState) => {
    fetch.post('/api/toggle', { _id, status }, { dataType: 'json' }).then((model) => {
      resetApi(() => {
        // remove query
        const data = getState().apis.data.map((d) => {
          if (d._id === _id) {
            return Object.assign({}, d, { status })
          }
          return d
        })

        dispatch(handleList(1, data))
        Message.success('Save successed')
      })
    }).catch((err) => {
      Message.error(err.message)
    })
  }
}

export function removeApi(id) {
  return (dispatch, getState) => {
    fetch.delete('/api', { _id: id }).then((model) => {
      if (model === 1) {
        const data = getState().apis.data.filter(d => d._id !== id)
        dispatch(handleList(1, data))
      }
    }).catch((err) => {
      Message.error(err.message)
    })
  }
}
