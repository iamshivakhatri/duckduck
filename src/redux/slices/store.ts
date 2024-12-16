'use client'

import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import FolderReducer from './folders'
import WorkSpaceReducer from './workspaces'

const rootReducer = combineReducers({
    //reducers
    FolderReducer,
    WorkSpaceReducer

})

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({ 
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
