import {EventActions, generateStore,} from '@drizzle/store'
import drizzleOptions from '../drizzleOptions'




export default generateStore({
    drizzleOptions,
    disableReduxDevTools: false  // enable ReduxDevTools!
})
