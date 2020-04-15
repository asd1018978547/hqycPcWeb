import axios from 'axios'
import {
  Loading
} from 'element-ui'

import {
  _CONFIG,
} from './config'

axios.defaults.baseURL = _CONFIG.url
axios.defaults.params = {
  partnerId: _CONFIG.partnerId
}

export const request = (
  api,
  para = {}
) => {
  let ld = null
  if (para.token == null) {
    delete para.token
  }
  if (para.loading) {
    ld = Loading.service({
      fullscreen: true,
      text: '努力加载中...',
      background: 'rgba(0,0,0,.6)',
      lock: true
    })
  }
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: api,
      data: para
    }).then(res => {
      if (ld) {
        ld.close()
      }
      const data = res.data
      if (data.ResponseId == -2) {
        window.open('http://' + window.location.host + '/auth')
      }
      resolve(data)
    }).catch(error => {
      if (ld) {
        ld.close()
      }
      reject(error)
    })
  })

  return new Promise((resolve, reject) => {
    promise.then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}
