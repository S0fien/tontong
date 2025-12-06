import { useState } from "react";
import { supabase } from "../services/supabase";
import { useAppStore } from "../store";
import { Card } from "./../components/ui/Card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  rememberMe?: string;
  general?: string;
}

const SignInBlock = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user } = useAppStore();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof SignInFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleLogin = async () => {
    const { data } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    setUser({ userInfos: data.user!, session: data.session! });
    console.log("Registration response:", data);
    // const navigate = useNavigate();
    // const queryClient = useQueryClient();

    // return useMutation({
    //   mutationFn: ({ email, password }) =>

    //   onSuccess: (data) => {
    //     queryClient.setQueryData(["user"], data.data.user);
    //     navigate("/dashboard");
    //   },
    // });
  };

  console.log("user", user);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    await handleLogin();

    // 🔹 Simulate a fake request
    setTimeout(() => {
      console.log("Form submitted:", formData);

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      alert("Signed in successfully (demo only)");

      setIsLoading(false);
    }, 1000);
  };

  const body = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      {errors.general && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {errors.general}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          disabled={isLoading}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <div className="flex items-center justify-between">
          <Input
            id="password"
            type={"password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            disabled={isLoading}
          />
        </div>

        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>
    </form>
  );

  const footer = (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? "Signing In..." : "Sign In"}
    </Button>
  );
  return (
    <Card
      body={body}
      isLoading={isLoading}
      footer={footer}
      className="w-full max-w-sm mx-auto flex flex-col gap-6"
    />
  );
};

export default SignInBlock;
