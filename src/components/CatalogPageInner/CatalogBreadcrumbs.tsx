import Link from "next/link";
import { ChevronRightIcon } from "../Icon/Icon";
import s from "./CatalogBreadcrumbs.module.css";

interface CatalogBreadcrumbsProps {
  breadcrumbs: { name: string; link: string }[];
}

export const CatalogBreadcrumbs: React.FC<CatalogBreadcrumbsProps> = ({
  breadcrumbs,
}) => (
  <nav aria-label="breadcrumb" className={s.breadcrumbs}>
    <ol className={s.breadcrumbsList}>
      {breadcrumbs.map((breadcrumb, index) => (
        <li key={index} className={s.breadcrumbsItem}>
          {index > 0 && (
            <ChevronRightIcon className={s.breadcrumbsSeparator} />
          )}
          <Link 
            href={breadcrumb.link}
            className={`${s.breadcrumbsLink} ${
              index === breadcrumbs.length - 1 ? s.breadcrumbsLinkActive : ""
            }`}
          >
            {breadcrumb.name}
          </Link>
        </li>
      ))}
    </ol>
  </nav>
);
