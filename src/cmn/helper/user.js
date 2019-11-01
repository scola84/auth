import get from 'lodash-es/get'
import merge from 'lodash-es/merge'
import { Role } from './role'
import { Token } from './token'

export class User {
  constructor (options = {}) {
    this._agents = null
    this._email = null
    this._id = null
    this._meta = null
    this._name = null
    this._password = null
    this._role = null
    this._settings = null
    this._tel = null
    this._token = null

    this.setAgents(options.agents)
    this.setEmail(options.email)
    this.setId(options.id)
    this.setMeta(options.meta)
    this.setName(options.name)
    this.setPassword(options.password)
    this.setRole(options.role)
    this.setSettings(options.settings)
    this.setTel(options.tel)
    this.setToken(options.token)
  }

  toObject () {
    return {
      email: this._email,
      id: this._id,
      name: this._name,
      role: this._role.toObject(),
      tel: this._tel
    }
  }

  getAgents () {
    this._agents = typeof this._agents === 'string'
      ? JSON.parse(this._agents)
      : this._agents

    return this._agents
  }

  setAgents (value = null) {
    this._agents = value === null
      ? []
      : value

    return this
  }

  addAgent (agent) {
    const agents = this.getAgents()

    for (let i = 0; i < agents.length; i += 1) {
      if (agents[i].hash === agent.hash) {
        return this
      }
    }

    this._agents.push(agent)
    return this
  }

  hasAgent (request) {
    if (this._role.getSetting('check.agent') === false) {
      return true
    }

    const hash = request.getHeader('x-ua')
    const agents = this.getAgents()

    for (let i = 0; i < agents.length; i += 1) {
      if (agents[i].hash === hash) {
        return true
      }
    }

    return false
  }

  getEmail () {
    return this._email
  }

  setEmail (value = null) {
    this._email = value
    return this
  }

  getEmailName () {
    return `${this.getName() || ''} <${this.getEmail()}>`.trim()
  }

  getId () {
    return this._id
  }

  setId (value = null) {
    this._id = value
    return this
  }

  getMeta () {
    this._meta = typeof this._meta === 'string'
      ? JSON.parse(this._meta)
      : this._meta

    return this._meta
  }

  setMeta (value = null) {
    if (this._meta === null) {
      this._meta = {}
    }

    merge(this.getMeta(), value)
    return this
  }

  getName () {
    return this._name
  }

  setName (value = null) {
    this._name = value
    return this
  }

  getPassword () {
    return this._password
  }

  setPassword (value = null) {
    this._password = value
    return this
  }

  getRole () {
    return this._role
  }

  setRole (value = {}) {
    this._role = value instanceof Role
      ? value
      : new Role(value)

    return this
  }

  hasPermission (permission) {
    return this._role.hasPermission(permission)
  }

  getSettings () {
    this._settings = typeof this._settings === 'string'
      ? JSON.parse(this._settings)
      : this._settings

    return this.settings
  }

  setSettings (value = null) {
    if (this._settings === null) {
      this._settings = {}
    }

    merge(this.getSettings(), value)
    return this
  }

  getSetting (path) {
    return get(this.getSettings(), path)
  }

  getTel () {
    return this._tel
  }

  setTel (value = null) {
    this._tel = value
    return this
  }

  getToken () {
    return this._token
  }

  setToken (value = {}) {
    this._token = value instanceof Token
      ? value
      : new Token(value)

    return this
  }
}
