// QRScanner.js

import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const App = () => {
    const [message, setMessage] = useState('');

    const onScanSuccess = (decodedText) => {
        fetch(`http://localhost/qr/handleScan.php?product_id=${decodedText}`)
            .then(response => response.text())
            .then(data => {
                setMessage(data);
            })
            .catch(error => console.error('Error:', error));
    };

    React.useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 });
        scanner.render(onScanSuccess);

        return () => scanner.clear();
    }, []);

    return (
        <div>
            <div id="reader"></div>
            <p>{message}</p>
        </div>
    );
};

export default App;
