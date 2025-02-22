import React, {createContext, useContext, useEffect, useState} from 'react'
import prep_env from '../models/prep_env';

const AppContext = createContext(null);

// Export a hook to consume the context
export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({children}) {
    const [appState, setAppState] = useState({
		ws_conf: null,
        is_mobile: false,
		mobile_type: null,
		can_app: false,
		curr_user: null,
		user_ready: false,
		user_types: [],
		basket_type: null,
		basket_total: 0,
        hasFlash: false,
        couldHaveFlash: false,
    });

    // Update the appState with configuration when the app mounts
    useEffect(() => {
        prep_env()
        .then((settings) => {
            console.log('Settings loaded in Provider:', settings)
            setAppState((prev) => ({ ...prev, ...settings }))
        })
        .catch((err) => {
            console.error('Error loading configuration:', err)
        })
    }, [])

    // A function to update appState easily
    function updateAppState(updates) {
        setAppState((prev) => ({ ...prev, ...updates }))
    }

    return (
        <AppContext.Provider value={[appState, updateAppState]}>
            {children}
        </AppContext.Provider>
    )
}

