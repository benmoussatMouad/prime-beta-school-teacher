import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";
import { useVisionUIController } from "../../../context";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  // react-hook-form setup
  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle remember me switch
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [context, dispatch] = useVisionUIController();

  // Handle form submission
  const onSubmit = (data) => {
    // Add your authentication logic here (e.g., API call to sign in)
  };

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="PRIME BETA SCHOOL"
      motto={context.direction === "rtl" ? "منصة المعلمين" : "PLATFORME POUR ENSEIGNANTS"}
      image={bgSignIn}
    >
      <VuiBox component="form" onSubmit={handleSubmit(onSubmit)} role="form">
        {/* Email Field */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <VuiInput
            {...register("email", {
              required: "L'adresse électronique est requise",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
            })}
            type="email"
            placeholder="Your email..."
            fontWeight="500"
          />
          {errors.email && (
            <VuiTypography variant="caption" color="error">{errors.email.message}</VuiTypography>
          )}
        </VuiBox>

        {/* Password Field */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <VuiInput
            {...register("password", {
              required: "Le mot de passe est requis.",
              minLength: { value: 6, message: "Password must be at least 6 characters." },
            })}
            placeholder="Votre password..."
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            endAdornment={
              <IconButton sx={{ position: "absolute", right: 10 }} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff color="white" /> : <Visibility color="white" />}
              </IconButton>
            }
          />
          {errors.password && (
            <VuiTypography variant="caption" color="error">{errors.password.message}</VuiTypography>
          )}
        </VuiBox>

        {/* Remember Me */}
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </VuiTypography>
        </VuiBox>

        {/* Submit Button */}
        <VuiBox mt={4} mb={1}>
          <VuiButton type="submit" color="info" fullWidth>
            SIGN IN
          </VuiButton>
        </VuiBox>

        {/* Sign Up Link */}
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
