import {func, object, bool, string} from 'prop-types';
import { memo } from 'react';
import './ShortUrl.css';
import { BiCopy, BiShareAlt, BiDownload } from 'react-icons/bi';
import ToggleSwitch from './../toggleSwitch/ToggleSwitch';
import useShortUrl from './useShortUrl';

const ShortUrl = ({url, insertUrl, generateUrl, btnDisabled, qrCode, toggleQrCode, shurl, copyShortUrl, shareShortUrl, downloadQrCode, shareQrCode, }) => {
    return (<>
        <div className="card">
            <div className="url-container">
                <input
                    value={url}
                    onChange={insertUrl}
                    type="text"
                    placeholder='https://www.example.com or https://example.com'
                />
                <button
                    onClick={generateUrl}
                    disabled={btnDisabled}
                >
                    ⚙️
                </button>
            </div>
            <div className="qr-container">
                <ToggleSwitch
                    id="qrSwitch"
                    checked={qrCode}
                    onCheck={toggleQrCode}
                    type="squared"
                    disabled={btnDisabled}
                />
                <label htmlFor="qrSwitch">QR code</label>
            </div>
        </div>
        {
            Object.keys(shurl).length > 0 &&
            <div className="short-url-container">
                <div className="short-url-inner-container">
                    <span className="short-url-label">Short URL</span>
                    <div className="short-url-link-container">
                        <input type="text" value={shurl.shortUrl} disabled />
                        <button type="button" onClick={copyShortUrl}>
                            <BiCopy size="1.5em" style={{ verticalAlign: 'middle' }}/>
                        </button>
                        <button type="button" onClick={shareShortUrl} disabled={!navigator.canShare}>
                            <BiShareAlt size="1.5em" style={{ verticalAlign: 'middle' }}/>
                        </button>
                    </div>
                </div>
                {
                    shurl.qrCode &&
                    <div className="short-url-inner-container">
                        <span className="short-url-label">QR Code</span>
                        <div className="short-url-link-container">
                            <div className="short-url-img-container">
                                <img alt="qrCode" src={shurl.qrCode} className="short-url-img" />
                            </div>
                            <div className="short-url-btn-container">
                                    <button type="button" onClick={downloadQrCode}>
                                        <BiDownload size="1.5em" style={{ verticalAlign: 'middle' }} />
                                    </button>
                                    <button type="button" onClick={shareQrCode} disabled={!navigator.canShare}>
                                        <BiShareAlt size="1.5em" style={{ verticalAlign: 'middle' }} />
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
    copyShortUrl: func.isRequired,
    shareShortUrl: func.isRequired,
    downloadQrCode: func.isRequired,
    shareQrCode: func.isRequired,
}
export default memo(ShortUrl);