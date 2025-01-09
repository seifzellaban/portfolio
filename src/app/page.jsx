import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-f">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* hero text */}
          <div className="text-center order-2 xl:text-left xl:order-none">
            <span>Software Developer</span>
            <div className="group">
              <h1 className="h1">
                Hello I'm <br />{" "}
                <span className="text-accent group-hover:text-accent-hover transition-all duration:500">
                  Seif Zakaria
                </span>
              </h1>
            </div>
            <p className="max-w-[500px] mb-6 text-white/80">
              I excel at crafting elegent digital experiences and I am
              proficient in various programming languages and technologies.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center xl:justify-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
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
          <div className="order-1 xl:order-none mb-8 xl:mb-0 "><Photo /></div>
        </div>
      </div>
    </section>
  );
};

export default Home;
