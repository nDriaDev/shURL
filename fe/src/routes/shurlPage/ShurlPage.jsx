import {memo} from "react";
import ShortUrl from "../../components/shortUrl/ShortUrl";
import ProfileButton from "../../components/button/profileButton/ProfileButton.jsx";
import useShortUrl from "../../components/shortUrl/useShortUrl.js";


const ShurlPage = ({}) => {
	const {
		mount,
		qrCode,
		url,
		shurl,
		btnDisabled,
		toggleQrCode,
		insertUrl,
		downloadQrCode,
		shareQrCode,
		shareShortUrl,
		copyShortUrl,
		generateUrl
	} = useShortUrl();

	if(mount) {
		return null;
	}

	return (<>
		<div className="d-flex justify-end">
			<ProfileButton/>
		</div>
		<ShortUrl
			url={url}
			btnDisabled={btnDisabled}
			copyShortUrl={copyShortUrl}
			shurl={shurl}
			generateUrl={generateUrl}
			insertUrl={insertUrl}
			qrCode={qrCode}
			shareShortUrl={shareShortUrl}
			shareQrCode={shareQrCode}
			downloadQrCode={downloadQrCode}
			toggleQrCode={toggleQrCode}
		/>
	</>)
};

export default memo(ShurlPage);