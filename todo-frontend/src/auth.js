class Auth {
  constructor() {
    this.authenticated = false
  }

  login(callback) {
    this.authenticated = true
    callback()
  }

  logout(callback) {
    this.authenticated = false
    callback()
  }

  isAuthenticated() {
    return this.authenticated
  }
}

// We're mimicking the singleton pattern
export default new Auth()
