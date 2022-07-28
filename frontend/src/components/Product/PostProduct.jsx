import Product from './Product'
import { Link } from 'react-router-dom'

function PostProduct() {
   
  return (
    <div>
        <Product />
        <Link to='/dashboard'>Back</Link>
    </div>
  )

}

export default PostProduct