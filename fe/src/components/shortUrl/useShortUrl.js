import {useState, useCallback, useMemo, useEffect} from 'react';
import spinnerAtom from "../../store/spinnerStore.js";
import {useAtom, useSetAtom} from "jotai";
import messagesAtom from "../../store/messagesStore.js";
import useFetch from "../common/useFetch.js";
import ApiUtil from "../../utils/apiUtil.js";
import meAtom from "../../store/meStore.js";
import {MessageUtil} from "../../utils/messagesUtil.js";
import {ErrorUtil} from "../../utils/errorUtil.js";

const useShortUrl = () => {
    const [spinner, setSpinner] = useAtom(spinnerAtom);
    const setErrorMessage = useSetAtom(messagesAtom);
    const [qrCode, setQrCode] = useState(false);
    const [url, setUrl] = useState('');
    const [shurl, setShurl] = useState({});
    const setMe = useSetAtom(meAtom);
    const [mount, setMount] = useState(true);

    const btnDisabled = useMemo(() => spinner || !!!url, [spinner, url]);

    const toggleQrCode = useCallback(() => setQrCode(q => !q), []);

    const insertUrl = useCallback(e => setUrl(e.target.value), []);

    const downloadQrCode = useCallback(e => {
        let a = document.createElement("a");
        a.href = data.qrCode;
        a.download = "qrCode.png";
        a.click();
    }, [shurl]);

    const shareQrCode = useCallback(async e => {
        const blob = await (await fetch(shurl.qrCode)).blob();
        const file = new File([blob], 'qrCode.png', { type: blob.type });
        navigator.share({
        title: 'ShortUrl',
        text: 'Check out this image!',
        files: [file],
        })
    }, [shurl]);

    const shareShortUrl = useCallback(e => {
        navigator.share({
            title: 'ShortUrl',
            text: shurl.shortUrl
        })
    }, [shurl]);

    const copyShortUrl = useCallback(e => {
        navigator.clipboard.writeText(shurl.shortUrl);
    }, [shurl]);

    const generateUrl = useCallback(async e => {
        try {
            setErrorMessage();
            setSpinner(true);
            const data = await useFetch({
                path: ApiUtil.URLS.SHURL.GENERATE.PATH,
                method: ApiUtil.URLS.SHURL.GENERATE.METHOD,
                body: {url, qrCode},
                bodyType: "json"
            });
            setShurl(data);
            setSpinner(false);
        } catch (error) {
            ErrorUtil.handlingError(error, setErrorMessage, setSpinner);
        }
    }, [url, qrCode]);

    const resetShurl = useCallback(e => {
        setShurl({});
    }, []);

    useEffect(() => {
        async function me() {
            setSpinner(true);
            setErrorMessage();
            try {
                const data = await useFetch({
                    path: ApiUtil.URLS.AUTH.ME.PATH,
                    method: ApiUtil.URLS.AUTH.ME.METHOD
                });
                setMe(data);
                setMount(false);
                setSpinner(false);
            } catch (e) {
                ErrorUtil.handlingError(e, setErrorMessage, setSpinner);
            }
        }
        me();
    }, []);

    return {
        mount,
        qrCode,
        url,
        shurl,
        resetShurl,
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