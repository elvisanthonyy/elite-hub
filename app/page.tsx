"use client";
import NavBar from "./components/nav/NavBar";
import { useRef, useEffect, useState, Children } from "react";
import Image from "next/image";
import CourseComp from "./components/course/CourseComp";
import Link from "next/link";
import Footer from "./components/footer/Footer";
import TestimonialComp from "./components/testimonial/TestimonialComp";
import api from "@/libs/api";
import { ICourse } from "@/models/courses";
import MainLoading from "./components/Loading/MainLoading";
import { useUser } from "./context/UserContext";
import { Metadata } from "next";

export default function Home() {
  const slideRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = [1, 2, 3, 4];
  const [inView, setInView] = useState(false);
  const { session } = useUser();

  const checkInView = () => {
    if (!slideRef.current) return;

    const rect = slideRef.current?.getBoundingClientRect();
    setInView(rect.top < window.innerHeight && rect.bottom > 0);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/course")
      .then((res) => {
        setLoading(false);
        setCourses(res.data.courses);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error", err);
      });
    window.addEventListener("scroll", checkInView);
    checkInView();
    return () => window.removeEventListener("scroll", checkInView);
  }, []);

  useEffect(() => {
    if (!inView) return;

    const slideInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [inView]);

  useEffect(() => {
    if (inView) {
      slideRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }, [index]);
  return (
    <div className="relative">
      <NavBar name="home" />
      <div className="flex flex-col relative pt-28 pb-12 px-6 text-white justify-center items-start w-full h-auto min-h-dvh bg-linear-0 from-white-1 to-hero-gradient/30">
        <div className="w-full h-auto ">
          <div className="flex flex-col mb-8">
            <div className="text-[32px] mb-2 text-black-2 font-bold">
              Get your <br />{" "}
              <span className="text-black-4">web Development</span> <br />{" "}
              career Started
            </div>
            <div className="text-black-2 text-[14px] font-medium p-4 border-l-3 border-primary-2">
              Get started today by registering and begin your journey doesn’t
              matter your level
            </div>
          </div>
          {!session && (
            <Link className="flex cursor-pointer" href={"/auth/signup"}>
              <div className="w-full text-[18px] font-semibold py-4 flex items-center cursor-pointer text-black-2 justify-center border border-black-2 rounded-[64px]">
                Get started
              </div>
            </Link>
          )}
        </div>

        <div
          className={`w-full h-[340px] flex items-end relative ${!session && "mt-10"}`}
        >
          <div className="relative w-full h-60 rounded-[24px] bg-primary-2 overflow-hidden">
            <div className="bg-white/30 absolute -left-10 -top-10 blur-xl h-40 rounded-full aspect-square"></div>
            <div className="bg-black/50 absolute -right-10 -bottom-10 blur-xl h-40 rounded-full aspect-square"></div>
          </div>

          <div className="absolute pl-2 overflow-hidden items-start justify-center w-full h-full  top-[50%] left-[50%] -translate-[50%] flex ">
            <Image
              src={"/designs/person-image.png"}
              alt="laptop image"
              height={1000}
              width={1000}
              className="w-[130%] h-[130%] object-cover"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-y-4">
          <div className="grid transition-all ease-in duration-500 hover:scale-110 hover:translate-x-[8px] grid-cols-[max-content_max-content] gap-x-8 place-items-center justify-items-start">
            <div className="flex justify-center items-center pr-1 pb-1  w-[56px] h-auto aspect-square border-2 border-black-2 rounded-full">
              <div className="w-[20px] aspect-square">
                <Image
                  src={"/icons/basic-logo.svg"}
                  alt="laptop image"
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-black-3 text-[16px] font-semibold flex">
              Basic
            </div>
          </div>
          <div className="grid transition-all ease-in duration-500 hover:scale-110 hover:translate-x-[8px] grid-cols-[max-content_max-content] gap-x-8 place-items-center justify-items-start ">
            <div className="flex justify-center items-center pr-1 pb-1  w-[56px] h-auto aspect-square border-2 border-black-2 rounded-full">
              <div className="w-[20px] aspect-square">
                <Image
                  src={"/icons/inter-logo.svg"}
                  alt="laptop image"
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-black-3 text-[16px] font-semibold">
              Intermediate
            </div>
          </div>
          <div className="grid transition-all ease-in duration-500 hover:scale-110 hover:translate-x-[8px] grid-cols-[max-content_max-content] gap-x-8 place-items-center justify-items-start">
            <div className="flex justify-center items-center pr-1 pb-1  w-[56px] h-auto aspect-square border-2 border-black-2 rounded-full">
              <div className="w-[20px] aspect-square">
                <Image
                  src={"/icons/advanced-logo.svg"}
                  alt="laptop image"
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-black-3 text-[16px] font-semibold">
              Advanced
            </div>
          </div>
        </div>
      </div>

      <div className="w-[95%] hidden my-6 rounded-2xl mx-auto h-12 flex justify-srart items-center bg-white  text-black  text-center">
        <div className="w-30 font-semibold flex justify-center items-center rounded-2xl bg-black/15 h-full">
          Course
        </div>
        <div className="w-30 flex justify-center items-center rounded-2xl  h-full">
          Testimonials
        </div>
        <div className="w-30 flex justify-center items-center rounded-2xl  h-full">
          About
        </div>
      </div>
      <div className="flex items-center h-[340px] hidden-scroll mb-3 pb-5 w-[95%] mx-auto overflow-x-scroll overflow-y-hidden">
        {loading ? (
          <MainLoading />
        ) : (
          courses?.map((course, index) => (
            <div key={course._id.toString()}>
              <CourseComp course={course} index={index} />
            </div>
          ))
        )}
      </div>

      <div
        onMouseEnter={() => setInView(false)}
        onMouseLeave={() => setInView(true)}
        ref={slideRef}
        className="flex hidden-scroll overflow-hidden w-full mb-10 min-h-55  "
      >
        <div
          className="w-full"
          ref={(el) => {
            slideRefs.current[0] = el;
          }}
        >
          <TestimonialComp name="Joseph" />
        </div>
        <div
          ref={(el) => {
            slideRefs.current[1] = el;
          }}
        >
          <TestimonialComp name="Sarah" />
        </div>

        <div
          ref={(el) => {
            slideRefs.current[2] = el;
          }}
        >
          <TestimonialComp name="David" />
        </div>
        <div
          ref={(el) => {
            slideRefs.current[3] = el;
          }}
        >
          <TestimonialComp name="Emma" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
