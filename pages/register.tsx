import Layout from "@/components/layout";
import Link from "next/link";

import Balancer from "react-wrap-balancer";
import Axios from "axios";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDown, Mail, Lock, User, Globe } from "lucide-react";

const roles = [
  { id: 0, name: "Athlete" },
  { id: 1, name: "Trainer" },
];

export default function Register() {
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  const [role, setRole] = useLocalStorage("role", 0);
  const [selectedRole, setselectedRole] = useState(roles[0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitRegister = async (e: any) => {
    e.preventDefault();
    let token: string;
    try {
      const { data } = await Axios.post(`${API_URL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: role?.toString(),
      });
      token = data?.userDetails;
      console.log(data);
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };

  // Useeffect to set the role
  useEffect(() => {
    setselectedRole(roles[role]);
  }, [role]);
  return (
    <Layout>
      <motion.div
        className="flex w-full flex-row overflow-hidden"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          className="flex w-full flex-col items-center justify-center pt-32"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="w-full px-5 md:w-1/2 md:py-10 md:px-10">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-rblue-500">Register</h1>
              <p className="py-1">Enter your information to register</p>
            </div>
            <form onSubmit={submitRegister}>
              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Name</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                      <User className="w-1/2 text-lg text-gray-400"></User>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500"
                      placeholder="Oliver"
                    />
                  </div>
                </div>
              </div>

              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Role</label>
                  <Listbox value={selectedRole} onChange={setselectedRole}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg rounded-lg border-2 border-gray-200 bg-white py-2 pl-3 pr-10 text-left outline-none focus:border-rblue-500 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <div className="flex items-center">
                          <div className="pointer-events-none z-10 flex w-10 items-center justify-center text-center">
                            <Globe className="-ml-6 w-1/2 text-lg text-gray-400"></Globe>
                          </div>
                          <span className="-ml-3 block truncate">
                            {selectedRole.name}
                          </span>
                        </div>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {roles.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-rblue-100 text-rblue-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={person}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-rblue-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>

              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Email</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                      <Mail className="w-1/2 text-lg text-gray-400"></Mail>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500"
                      placeholder="oliver.kahn@example.com"
                    />
                  </div>
                </div>
              </div>
              <div className="-mx-3 flex">
                <div className="mb-12 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Password</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                      <Lock className="w-1/2 text-lg text-gray-400"></Lock>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <button className="mx-auto block w-full max-w-xs rounded-lg bg-rblue-500 px-3 py-3 font-semibold text-white hover:bg-rblue-600 active:bg-rblue-700">
                    Register Now
                  </button>
                </div>
              </div>
            </form>
            <motion.div
              className="mx-auto flex flex-col items-center justify-center"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Balancer>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-rblue-500 transition duration-300 ease-out hover:text-rblue-300 hover:underline"
                >
                  Log in
                </Link>
              </Balancer>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-hero box-border hidden h-screen w-1/2 bg-[url('/assets/trainer.jpg')] bg-cover bg-center bg-no-repeat py-10 px-10 md:block"
        ></motion.div>
      </motion.div>
    </Layout>
  );
}
