import {func, object, bool, string, number, array} from 'prop-types';
import { memo } from 'react';
import './ShortUrl.css';
import { BiCopy, BiShareAlt, BiDownload } from 'react-icons/bi';
import ToggleSwitch from './../toggleSwitch/ToggleSwitch';
import useShortUrl from './useShortUrl';
import {CiTimer, IoQrCode, RiCodeSSlashFill, SlSettings, VscClose} from "react-icons/all.js";
import Select from "../select/Select.jsx";

const ShortUrl = ({url, insertUrl, urlCode, insertUrlCode, generateUrl, btnDisabled, qrCode, toggleQrCode, shurl, resetShurl, expireIn, insertExpireIn, expireOptionsList, copyShortUrl, shareShortUrl, downloadQrCode, shareQrCode}) => {
    return (<>
        <div className="card">
            <div className="url-container">
                <input
                    value={url}
                    onChange={insertUrl}
                    type="text"
                    placeholder='https://www.example.com or https://example.com'
                />
            </div>
            <div className="opt-container">
                <div className="code-container">
                    <RiCodeSSlashFill title="urlCode" style={{ height: '1.5em', width:'3em', verticalAlign: 'middle' }}/>
                    <input type="text" placeholder="Url code" value={urlCode} onChange={insertUrlCode}/>
                </div>
                <div className="qr-container">
                    <IoQrCode title="Qrcode" size="1.5em" style={{ verticalAlign: 'middle' }}/>
                    <ToggleSwitch
                        id="qrSwitch"
                        checked={qrCode}
                        onCheck={toggleQrCode}
                        type="squared"
                        disabled={btnDisabled}
                    />
                </div>
                <div className="timer-container">
                    <CiTimer title="Durata" size="1.5em" style={{ verticalAlign: 'middle' }}/>
                    <Select
                        className="timer-select"
                        value={expireIn}
                        list={expireOptionsList}
                        onChange={insertExpireIn}
                    />
                </div>
            </div>
            <div className="btn-url-container">
                <button
                    className="btn-url"
                    onClick={generateUrl}
                    disabled={btnDisabled}
                >
                    <SlSettings size="1.3em" style={{ verticalAlign: 'middle', paddingRight: 4 }} />
                    Genera
                </button>
            </div>
        </div>
        {
            Object.keys(shurl).length > 0 &&
            <div className="short-url-container">
                <button className="short-url-container-close-btn" onClick={resetShurl}>
                    <VscClose title="Chiudi" size="1.5em" style={{ verticalAlign: 'middle' }}/>
                </button>
                <div className="short-url-inner-container">
                    <span className="short-url-label">Short URL</span>
                    <div className="short-url-link-container">
                        <input type="text" value={shurl.shortUrl} disabled />
                        <button type="button" onClick={copyShortUrl}>
                            <BiCopy title="Copia" size="1.5em" style={{ verticalAlign: 'middle' }}/>
                        </button>
                        <button type="button" onClick={shareShortUrl} disabled={!navigator.canShare}>
                            <BiShareAlt title="Condividi" size="1.5em" style={{ verticalAlign: 'middle' }}/>
                        </button>
                    </div>
                </div>
                {
                    shurl.qrCode &&
                    <div className="short-url-inner-container">
                        <span className="short-url-label">QR Code</span>
                        <div className="short-url-link-container">
                            <div className="short-url-img-container">
                                <img alt="QrCode" src={shurl.qrCode} className="short-url-img" />
                            </div>
                            <div className="short-url-btn-container">
                                    <button type="button" onClick={downloadQrCode}>
                                        <BiDownload title="Copia" size="1.5em" style={{ verticalAlign: 'middle' }} />
                                    </button>
                                    <button type="button" onClick={shareQrCode} disabled={!navigator.canShare}>
                                        <BiShareAlt title="Condividi" size="1.5em" style={{ verticalAlign: 'middle' }} />
                                    </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        }
    </>)
}

ShortUrl.displayName = "ShortUrl";
ShortUrl.propTypes = {
    url: string.isRequired,
    insertUrl: func.isRequired,
    urlCode: string.isRequired,
    insertUrlCode: func.isRequired,
    generateUrl: func.isRequired,
    btnDisabled: bool.isRequired,
    qrCode: bool.isRequired,
    expireIn: string.isRequired,
    insertExpireIn: func.isRequired,
    expireOptionsList: array.isRequired,
    toggleQrCode: func.isRequired,
    shurl: object.isRequired,
    resetShurl: func.isRequired,
    copyShortUrl: func.isRequired,
    shareShortUrl: func.isRequired,
    downloadQrCode: func.isRequired,
    shareQrCode: func.isRequired,
}
export default memo(ShortUrl);