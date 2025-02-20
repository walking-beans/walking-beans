/*
// 예시
import React, { useState } from 'react';

function OrderStatusUpdate() {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateStatus = (orderId, newStatus) => {
        setLoading(true);
        setError(null);

        fetch('/api/order/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderId,
                status: newStatus,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setStatus(data.status); // 응답 받은 새로운 상태로 상태 업데이트
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to update order status');
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Update Order Status</h1>
            <button onClick={() => updateStatus(123, 'shipped')}>
                {loading ? 'Updating...' : 'Mark as Shipped'}
            </button>
            {error && <p>{error}</p>}
            {status && <p>Order status: {status}</p>}
        </div>
    );
}

export default OrderStatusUpdate;

 */