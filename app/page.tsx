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

export default function Home() {
  const slideRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = [1, 2, 3, 4];
  const [inView, setInView] = useState(false);

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
      <div className="flex relative text-white text-5xl justify-center items-center w-full h-140 bg-black">
        <div className="absolute w-full h-full bg-black/80"></div>
        <div className="absolute hub-text text-center left-[50%] top-[50%] -translate-[50%]">
          ELITE HUB
        </div>
        <Image
          src={"/laptop.jpg"}
          alt="laptop image"
          height={500}
          width={250}
          className="w-full h-full object-fill"
        />
        <Link
          className="flex cursor-pointer w-auto h-auto absolute bottom-15"
          href={"/auth/login"}
        >
          <button className="cursor-pointer text-[16px] rounded-4xl bg-white text-black px-20 py-6">
            Get Started
          </button>
        </Link>
      </div>
      <div className="flex justify-center bg-white pt-10 w-[95%] px-5 p-1 mt-5 rounded-lg h-50 mx-auto">
        {" "}
        <div className="flex text-lg text-gray-900">
          Become a web developer in short and simple to understand way without
          the need for a laptop for the price from N0 to N10000
        </div>
      </div>
      <div className="w-[95%] rounded-xl mx-auto overflow-hidden text-sm flex justify-start items-center text-black h-12 bg-white mt-5">
        <div className="shrink- font-semibold flex w-auto slide-animation mr-5">
          <div className=" flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey todayy
          </div>

          <div className=" flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>

          <div className=" flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className=" flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
          <div className="flex shrink-0 mx-5">
            Start Your web Development Journey today
          </div>
        </div>
      </div>

      <div className="w-[95%] my-6 rounded-2xl mx-auto h-12 flex justify-center items-center bg-black font-semibold text-gray-50  text-center">
        Courses
      </div>
      <div className="flex items-center min-h-65 hidden-scroll mb-3 pb-5 w-[95%] mx-auto overflow-x-scroll">
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
        className="flex  hidden-scroll overflow-hidden w-full py-5 mb-10 min-h-65 h-auto bg-white/50"
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
