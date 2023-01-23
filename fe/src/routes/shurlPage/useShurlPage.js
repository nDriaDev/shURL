import { useState, useCallback } from 'react';
import { MessageUtils } from '../../utils/messagesUtils';

const useShurlPage = () => {
    const [spinner, setSpinner] = useState(false);
    const [result, setResult] = useState(null);
    const [messages, setMessages] = useState({
        default: [],
        success: [],
        warning: [],
        error: []
    })

    const generate = useCallback(async (url, qrCode) => {
        try {
        setMessages({ default: [], success: [], warning: [], error: [] });
        setSpinner(true);
        const response = await fetch('/shortURL', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ url, qrCode }),
        });
        const result = await response.json();
        if (!response.ok) {
            throw Error(result.error);
        }
        setResult(result);
        } catch (error) {
        setMessages(m => ({ ...m, ...MessageUtils.resolveBeMessages(error) }));
        } finally {
        setSpinner(false);
        }
    }, []);

    return {
        spinner,
        result,
        messages,
        generate
    }
}

export default useShurlPage;