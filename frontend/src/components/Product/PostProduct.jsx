import Product from './Product'

import {useTheme} from '../../Context/ThemeProvider'

function PostProduct() {
  const theme = useTheme()
  return (
    <div className={`postProduct ${theme ? 'dark' : ''}`}>
      <div className="container">
        
        <Product />
      </div>
    </div>
  )

}

export default PostProduct