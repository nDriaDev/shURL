import {useState, useCallback, useMemo, useEffect} from 'react';
import spinnerAtom from "../../store/spinnerStore.js";
import {useAtom, useSetAtom} from "jotai";
import messagesAtom from "../../store/messagesStore.js";
import useFetch from "../common/useFetch.js";
import ApiUtil from "../../utils/apiUtil.js";
import {ErrorUtil} from "../../utils/errorUtil.js";
import CONSTANTS from "../../utils/constants.js";
import {authAtom} from "../../store/authStore.js";
import {MessageUtil} from "../../utils/messagesUtil.js";

const useShortUrl = () => {
    const [spinner, setSpinner] = useAtom(spinnerAtom);
    const setMessage = useSetAtom(messagesAtom);
    const [qrCode, setQrCode] = useState(false);
    const [url, setUrl] = useState('');
    const [urlCode, setUrlCode] = useState('');
    const [shurl, setShurl] = useState({});
    const [expireIn, setExpireIn] = useState("");
    const [me, setMe] = useAtom(authAtom);
    const [mount, setMount] = useState(true);

    const btnDisabled = useMemo(() => spinner || !!!url || expireIn === "", [spinner, url, expireIn]);

    const isLogged = useMemo(() => !!sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN), [])

    const toggleQrCode = useCallback(() => setQrCode(q => !q), []);

    const insertUrl = useCallback(e => setUrl(e.target.value), []);

    const insertUrlCode = useCallback(e => setUrlCode(e.target.value), []);

    const insertExpireIn = useCallback(val => {
        setMessage();
        if(val === "-1" && (!isLogged || !me)) {
            setMessage(MessageUtil.resolveErrorMessage(CONSTANTS.MESSAGES.ALL_TIME_ERROR));
        }
        setExpireIn(val);
    }, [isLogged, me]);

    const expireOptionsList = useMemo(() => CONSTANTS.EXPIRE_URL_IN, []);

    const downloadQrCode = useCallback(e => {
        try {
            let a = document.createElement("a");
            a.href = shurl.qrCode;
            a.download = "qrCode.png";
            a.click();
            setMessage(MessageUtil.resolveSuccessMessage("Qrcode download will start shortly!"))
            setTimeout(() => setMessage(), 2000);
        } catch (e) {
            setMessage(MessageUtil.resolveErrorMessage(e));
        }
    }, [shurl]);

    const shareQrCode = useCallback(async e => {
       try {
           const blob = await (await fetch(shurl.qrCode)).blob();
           const file = new File([blob], 'qrCode.png', { type: blob.type });
           navigator.share({
               title: 'ShortUrl',
               text: 'Check out this image!',
               files: [file],
           })
       } catch (e) {
           setMessage(MessageUtil.resolveErrorMessage(e));
       }
    }, [shurl]);

    const shareShortUrl = useCallback(e => {
        try {
            navigator.share({
                title: 'ShortUrl',
                text: shurl.shortUrl
            })
        } catch (e) {
            setMessage(MessageUtil.resolveErrorMessage(e));
        }
    }, [shurl]);

    const copyShortUrl = useCallback(e => {
        navigator.clipboard.writeText(shurl.shortUrl);
        setMessage(MessageUtil.resolveSuccessMessage("Shurl copied to clipboard!"))
        setTimeout(() => setMessage(), 2000);
    }, [shurl]);

    const generateUrl = useCallback(async e => {
        try {
            setMessage();
            setSpinner(true);
            setShurl({});
            const data = await useFetch({
                path: ApiUtil.URLS.SHURL.GENERATE.PATH,
                method: ApiUtil.URLS.SHURL.GENERATE.METHOD,
                body: {url, qrCode, urlCode, expireIn},
                bodyType: "json"
            });
            setShurl(data);
            setSpinner(false);
        } catch (error) {
            MessageUtil.resolveErrorMessage(error);
        }
    }, [url, qrCode, expireIn, urlCode]);

    const resetShurl = useCallback(e => {
        setShurl({});
    }, []);

    useEffect(() => {
        async function me() {
            setMessage();
            if(!isLogged) {
                setMount(false);
                return;
            }
            setSpinner(true);
            try {
                const data = await useFetch({
                    path: ApiUtil.URLS.AUTH.ME.PATH,
                    method: ApiUtil.URLS.AUTH.ME.METHOD
                });
                setMe(data);
                setMount(false);
                setSpinner(false);
            } catch (e) {
                // ErrorUtil.handlingError(e, setMessage, setSpinner);
                MessageUtil.resolveErrorMessage(e);
            }
        }
        me();
    }, [isLogged]);

    return {
        mount,
        qrCode,
        url,
        shurl,
        urlCode,
        insertUrlCode,
        resetShurl,
        expireIn,
        insertExpireIn,
        expireOptionsList,
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