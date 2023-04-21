import ShippingForm from "../components/ShippingForm";
import Card from 'react-bootstrap/Card';

const ShippingInfo = () => {
    return (
        <>
            <h1>Shipping Info</h1>
            <div className="d-flex justify-content-center">
                <Card style={{ mixWidth: '80vw' }} className="mt-4">
                    <Card.Body>
                        <ShippingForm />
                    </Card.Body>
                </Card>
            </div>     
        </>
    )
}

export default ShippingInfo