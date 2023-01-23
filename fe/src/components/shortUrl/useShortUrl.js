import { useState, useCallback, useMemo } from 'react';

const useShortUrl = ({ data, generate, spinner }) => {
    const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm;
    const [qrCode, setQrCode] = useState(false);
    const [url, setUrl] = useState('');

    const btnDisabled = useMemo(() => !URL_REGEX.test(url) || spinner, [url, spinner]);

    const toggleQrCode = useCallback(() => setQrCode(q => !q), []);

    const insertUrl = useCallback(e => setUrl(e.target.value), []);

    const downloadQrCode = useCallback(e => {
        let a = document.createElement("a");
        a.href = data.qrCode;
        a.download = "qrCode.png";
        a.click();
    }, [data]);

    const shareQrCode = useCallback(async e => {
        const blob = await (await fetch(data.qrCode)).blob();
        const file = new File([blob], 'qrCode.png', { type: blob.type });
        navigator.share({
        title: 'ShortUrl',
        text: 'Check out this image!',
        files: [file],
        })
    }, [data]);

    const shareShortUrl = useCallback(e => {
        navigator.share({
            title: 'ShortUrl',
            text: data.shortUrl
        })
    }, [data]);

    const copyShortUrl = useCallback(e => {
        navigator.clipboard.writeText(data.shortUrl);
    }, [data]);

    const generateUrl = useCallback(e => generate(url, qrCode), [url, qrCode, generate]);

    return {
        qrCode,
        url,
        btnDisabled,
        toggleQrCode,
        insertUrl,
        downloadQrCode,
        shareQrCode,
        shareShortUrl,
        copyShortUrl,
        generateUrl
    }
}

export default useShortUrl;