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
		resetShurl,
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
		<ShortUrl
			url={url}
			btnDisabled={btnDisabled}
			copyShortUrl={copyShortUrl}
			shurl={shurl}
			resetShurl={resetShurl}
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