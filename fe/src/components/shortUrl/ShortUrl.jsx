import { func, object, bool } from 'prop-types';
import { memo } from 'react';
import './ShortUrl.css';
import { BiCopy, BiShareAlt, BiDownload } from 'react-icons/bi';
import ToggleSwitch from './../toggleSwitch/ToggleSwitch';
import useShortUrl from './useShortUrl';

const ShortUrl = ({ data, generate, spinner }) => {
    const {
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
    } = useShortUrl({ data, generate });

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
                    disabled={spinner}
                />
                <label htmlFor="qrSwitch">QR code</label>
            </div>
        </div>
        {
            data &&
            <div className="short-url-container">
                <div className="short-url-inner-container">
                    <span className="short-url-label">Short URL</span>
                    <div className="short-url-link-container">
                        <input type="text" value={data.shortUrl} disabled />
                        <button type="button" onClick={copyShortUrl}>
                            <BiCopy size="1.5em" style={{ verticalAlign: 'middle' }}/>
                        </button>
                        <button type="button" onClick={shareShortUrl} disabled={!navigator.canShare}>
                            <BiShareAlt size="1.5em" style={{ verticalAlign: 'middle' }}/>
                        </button>
                    </div>
                </div>
                {
                    data.qrCode &&
                    <div className="short-url-inner-container">
                        <span className="short-url-label">QR Code</span>
                        <div className="short-url-link-container">
                            <div className="short-url-img-container">
                                <img alt="qrCode" src={data.qrCode} className="short-url-img" />
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
    data: object,
    generate: func.isRequired,
    spinner: bool.isRequired
}

export default memo(ShortUrl);