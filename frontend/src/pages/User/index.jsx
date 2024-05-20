import { getUser } from "./api";
import { Alert } from "../../shared/components/Alert";
import { Spinner } from "../../shared/components/spinner";
import { useParamRouteParamApiRequest } from "../../shared/hooks/useRouteParamApiRequest";
import { ProfileCard } from "./components/ProfileCard";

export function User() {
  const {
    apiProgress,
    data: user,
    error,
  } = useParamRouteParamApiRequest("id", getUser);

  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {user && <ProfileCard user={user} />}

      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
