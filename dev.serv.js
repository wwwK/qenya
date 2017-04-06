import app from './server'

// api server =================================
app({
  appPort: 5000,
  apiPort: 5001,
  staticPort: 5002,
  render: (res) => {
    if (res.data) {
      let keys = Object.keys(res.data)
      return {
        success: true,
        model: keys.length === 1 ? res.data[keys[0]] : res.data
      }
    } else {
      return {
        success: false,
        errors: res.errors
      }
    }
  }
})
