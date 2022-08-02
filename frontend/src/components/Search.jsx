import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {useDispatch} from 'react-redux'


function Search({getAllProducts}) {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()


    const handleChange = (e) => {
        dispatch(getAllProducts(e.target.value))
        setSearch(prevState => e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getAllProducts(search))
    }
  return (
    <div className='search--container'>
        <div className="search container">
        <div className='search__img search__img--left'></div>
        <form onSubmit={handleSubmit} className='search__form'>
            <div className='intro'>
                <h1>Welcome to <span>INNOUT</span></h1>
                <p>An easier way to Buy and sell </p>
            </div>
            
            <div className="form--group">
                <input
                    type="text"
                    name='search'
                    value={search}
                    onChange={handleChange}
                    placeholder='search product'
                />

                <button type='submit'><FaSearch className='search__icon' /></button>
            </div>
            
        </form>
        <div className='search__img search__img--right'>
        </div>
        </div>
    </div>
  )
}

export default Search