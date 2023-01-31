import {func, object, bool, string} from 'prop-types';
import { memo } from 'react';
import './ShortUrl.css';
import { BiCopy, BiShareAlt, BiDownload } from 'react-icons/bi';
import ToggleSwitch from './../toggleSwitch/ToggleSwitch';
import useShortUrl from './useShortUrl';
import {CiTimer, IoQrCode, SlSettings, VscClose} from "react-icons/all.js";

const ShortUrl = ({url, insertUrl, generateUrl, btnDisabled, qrCode, toggleQrCode, shurl, resetShurl, copyShortUrl, shareShortUrl, downloadQrCode, shareQrCode, }) => {
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
                    <select className="timer-select" disabled>
                        <option>Sempre attivo</option>
                        <option>1h</option>
                        <option>2h</option>
                        <option>6h</option>
                        <option>12h</option>
                        <option>24h</option>
                    </select>
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
    generateUrl: func.isRequired,
    btnDisabled: bool.isRequired,
    qrCode: bool.isRequired,
    toggleQrCode: func.isRequired,
    shurl: object.isRequired,
    resetShurl: func.isRequired,
    copyShortUrl: func.isRequired,
    shareShortUrl: func.isRequired,
    downloadQrCode: func.isRequired,
    shareQrCode: func.isRequired,
}
export default memo(ShortUrl);