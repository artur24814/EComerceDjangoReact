import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import StoreItem from '../components/StoreItem'
import { Search } from 'react-bootstrap-icons';
import useDebounce from '../hooks/useDebounce';


const Store = () => {

    const [products, setProducts] = useState([])

    const [searchText, setSearchText] = useState('')

    const debounce = useDebounce(searchText, 700)

    useEffect(() => {
        getProducts()
    }, [debounce])

    let getProducts = async() => {
        let responce = await fetch(`/api/products?title=${searchText}`)
        let data = await responce.json()
        console.log('DATA:', data)
        setProducts(data)
    }

    return (
        <>
            <h1> Store</h1>
            <div className="col-md-5 mx-auto mb-4">
                <div className="small fw-light">search products</div>
                <div className="input-group">
                    <input 
                        className="form-control border-end-0" 
                        placeholder='Search'
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        type="search" 
                        />
                    <span className="input-group-append">
                        <button className="btn btn-outline-secondary bg-white ms-n5" type="button">
                            <Search />
                        </button>
                    </span>
                </div>
            </div>
            <Row md={2} xs={1} lg={3} className="g-3">
                {products.map(item => (
                    <Col key={item.id}>
                        <StoreItem item={item}/>
                    </Col>
                ))}
            </Row>
        </>
        
    )
}

export default Store