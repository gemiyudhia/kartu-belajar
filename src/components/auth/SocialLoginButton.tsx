import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const SocialLoginButton = () => {
  return (
    <Button variant="outline" className="bg-transparent w-full cursor-pointer">
      <FcGoogle />
      Google
    </Button>
  );
};

export default SocialLoginButton;
