import { Button } from "../../../../../shared/components/Button";
import { useUserDeleteButton } from "./useUserDeleteButton";

export function UserDeleteButton(){
    const {apiProgress, onClick} = useUserDeleteButton();
    return <Button styleType = "danger"  onClick={onClick} apiProgress={apiProgress}> Delete</Button>
}