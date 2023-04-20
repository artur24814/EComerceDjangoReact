import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import StoreItem from '../components/StoreItem'

const Store = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    let getProducts = async() => {
        let responce = await fetch('/api/products')
        let data = await responce.json()
        console.log('DATA:', data)
        setProducts(data)
    }

    return (
        <>
            <h1> Store</h1>
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