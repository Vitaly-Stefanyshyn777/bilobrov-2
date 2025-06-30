import s from "./FooterInstList.module.css";
import Image from "next/image";

const items = [
  {
    id: 1,
    image: "/temporarily/inst/Mask group-1.jpg",
    link: "",
  },
  {
    id: 2,
    image: "/temporarily/inst/Mask group.jpg",
    link: "",
  },
  {
    id: 3,
    image: "/temporarily/inst/Mask group-2.jpg",
    link: "",
  },
  {
    id: 4,
    image: "/temporarily/inst/Mask group-3.jpg",
    link: "",
  },
];

export const FooterInstList = () => {
  return (
    <ul className={s.list}>
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.link}>
            <Image src={item.image} alt="Inst" width={502} height={502} />
          </a>
        </li>
      ))}
    </ul>
  );
};
