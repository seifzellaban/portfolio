import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/seifzellaban/" },
  { icon: <FaLinkedinIn />, path: "https://linkedin.com/in/seifzellaban" },
  { icon: <FaYoutube />, path: "https://youtube.com/@seifzellaban" },
  { icon: <FaXTwitter />, path: "https://x.com/seifzellaban" },
  // { icon: <FaFacebook />, path: "https://facebook.com/seifzellaban" },
  // { icon: <FaInstagram />, path: "https://instagram.com/theseifzellaban" },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
