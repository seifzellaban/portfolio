import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import LocalTime from "./../components/LocalTime";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-f">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* hero text */}
          <div className="text-center order-2 xl:text-left xl:order-none">
            <span className="flex gap-2">
              Software Developer {"|"} <LocalTime />
            </span>
            <div className="group">
              <h1 className="h1">
                Hello I'm <br />{" "}
                <span className="font-cursive text-accent group-hover:text-accent-hover transition-all duration:500">
                  Seif Zakaria
                </span>
              </h1>
            </div>
            <p className="max-w-[500px] mb-6 text-white/80">
              I specialize in transforming designs into functional,
              high-performing full-stack web applications. Let's discuss your
              next project.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center xl:justify-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <a
                  href="/assets/resume/Seif Zakaria - Resume.pdf"
                  download="Seif Zakaria - Fullstack Software Engineer.pdf"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0 ">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
