import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1 className="text-warning">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-error">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}