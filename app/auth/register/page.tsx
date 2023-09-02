import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import RegisterForm from "@/components/Nav/auth/RegisterForm";

const Register = async () => {
  // const session = await getServerSession(authOptions);

  // if (session) {
  //   redirect("/");
  // }

  return (
    <section className="flex items-center justify-center mt-48 text-white">
      <RegisterForm />
    </section>
  );
};

export default Register;
