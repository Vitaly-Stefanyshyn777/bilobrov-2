import s from "./ProductContent.module.css";

export const ProductShortDescription: React.FC<{
  desc: string | React.ReactNode;
}> = ({ desc }) =>
  typeof desc === "string" ? (
    <p className={s.shortDesc} dangerouslySetInnerHTML={{ __html: desc }} />
  ) : (
    <>{desc}</>
  );
