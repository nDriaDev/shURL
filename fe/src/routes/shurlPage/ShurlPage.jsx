import { memo } from "react";
import Messages from "../../components/messages/Messages";
import ShortUrl from "../../components/shortUrl/ShortUrl";
import Spinner from "../../components/spinner/Spinner";
import useShurlPage from "./useShurlPage";

const ShurlPage = ({ }) => {
    const {
        spinner,
        result,
        messages,
        generate
    } = useShurlPage();

    return (<>
        <ShortUrl generate={generate} data={result} spinner={spinner} />
        <Spinner show={spinner} />
        <Messages
            defaultMessages={messages.default}
            successMessages={messages.success}
            warningMessages={messages.warning}
            errorMessages={messages.error}
        />
    </>)
};

export default memo(ShurlPage);