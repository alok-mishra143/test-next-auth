interface LoginProps {
  email: string;
  password: string;
}

interface LoginUserProps {
  email: string;
  password: string;
}

interface SignupProps extends LoginProps {
  name: string;
  confirmPassword: string;
}

interface GetUserByIdProps {
  userid: string;
}

interface UserDataProps {
  UserData: {
    id: string;
    name: string;
    email: string;
    gender: "MALE" | "FEMALE" | "OTHERS";
    profileImage: string | null;
    phone: string | null;
    department: string | null;
    class: string | null;
    role: "STUDENT" | "TEACHER" | "ADMIN";
    address: string | null;
  };
}

interface OnBoardingProps {
  gender: "MALE" | "FEMALE" | "OTHERS";
  phone: string;
  address: string;

  department?: string;
  class?: string;
}

interface UpdateUser extends OnBoardingProps {
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  isverified: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  gender: string | null;
  profileImage?: string | null;
  phone: string | null;
  department: string | null;
  class: string | null;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  address: string | null;
  isVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
