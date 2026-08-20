export interface OptionType {
  value: string;
  label: string;
}

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  separatorIcon?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  totalItems?: number;
  perPage?: number;
  text?: string;
}

export interface SubHeroProps {
  title: string;
  image?: string;
}

export interface HeadingProps {
  title1?: string;
  title2?: string;
  title1Color?: string;
  title2Color?: string;
  subtitle?: string;
  viewAllText?: string;
  viewAllHref?: string;
}
