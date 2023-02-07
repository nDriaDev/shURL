import {memo} from "react";
import ShortUrl from "../../../components/shortUrl/ShortUrl.jsx";
import useShortUrl from "../../../components/shortUrl/useShortUrl.js";
import useTitle from "../../../components/common/useTitle.js";
import useMetaDescription from "../../../components/common/useMetaDescription.js";


const ShurlPage = ({}) => {
	useTitle("ShURL - Generate");
	useMetaDescription("Generate short url");

	const {
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
			expireIn={expireIn}
			insertExpireIn={insertExpireIn}
			expireOptionsList={expireOptionsList}
			generateUrl={generateUrl}
			insertUrl={insertUrl}
			qrCode={qrCode}
			shareShortUrl={shareShortUrl}
			shareQrCode={shareQrCode}
			downloadQrCode={downloadQrCode}
			toggleQrCode={toggleQrCode}
			urlCode={urlCode}
			insertUrlCode={insertUrlCode}
		/>
	</>)
};

export default memo(ShurlPage);