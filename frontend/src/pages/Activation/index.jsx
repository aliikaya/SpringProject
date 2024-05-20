import { activateUser } from "./api";
import { Alert } from "../../shared/components/Alert";
import { Spinner } from "../../shared/components/spinner";
import { useParamRouteParamApiRequest } from "../../shared/hooks/useRouteParamApiRequest";
// import { Spinner } from "shared/components/spinner";

Spinner;

export function Activation() {
  const { apiProgress, data, error } = useParamRouteParamApiRequest(
    "token",
    activateUser
  );

  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {data?.message && <Alert>{data.message}</Alert>}

      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
