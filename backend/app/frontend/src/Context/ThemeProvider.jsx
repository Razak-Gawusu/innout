import React, {useState, useContext, createContext} from 'react'

const themeContext = createContext()
const themeUpdateContext = createContext()

export const useTheme = () => {
    return useContext(themeContext)
}

export const useUpdateTheme = () => {
    return useContext(themeUpdateContext)
}

function ThemeProvider({children}) {
    const [theme, setTheme] = useState(false)

    const toggleTheme = () => {
        setTheme(prevTheme => !prevTheme)
    }

  return (
    <themeContext.Provider value={theme}>
        <themeUpdateContext.Provider value={toggleTheme}>
            {children}
        </themeUpdateContext.Provider>
    </themeContext.Provider>
  )
}

export default ThemeProvider