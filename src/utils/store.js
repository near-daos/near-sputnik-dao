import getConfig from "../config";

const readDefaultState = () => {
  try {
    return JSON.parse(window.localStorage.getItem('dao_storage'))
  } catch (err) {
    return {}
  }
}

const defaultState = {
  loading: false,
  config: {
    factory: getConfig(process.env.NODE_ENV || 'development').contractName,
    contract: '',
    network: getConfig(process.env.NODE_ENV || 'development'),
    filter: {
      switchAll: true,
      switchInProgress: false,
      switchDone: false,
      switchNew: false,
      switchExpired: false,
    },
    lastShownProposal: {
      index: 0,
      when: new Date('2020-04-22')
    },
    ...readDefaultState(),
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'config': {
      return {...state, config: action.payload}
    }
    case 'loading': {
      return {...state, loading: action.payload}
    }
    default:
      throw new Error('mutation type not defined')
  }
}

export {reducer, defaultState}
