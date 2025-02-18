export interface Restaurant {
  name: string;
  id: number;
  coverImage: string;
  activeTimePeriod: {
    open: string;
    close: string;
  };
  menus: string[];
}

export interface ShortMenu {
  name: string;
  id: number;
  thumbnailImage: string;
  discountedPercent: number;
  fullPrice: number;
  sold: number;
  totalInStock: number;
  isTopSeller?: boolean;
}

export interface FullMenu {
  name: string;
  id: number;
  thumbnailImage: string;
  discountedPercent: number;
  sold: number;
  fullPrice: number;
  totalInStock: number;
  options?: {
    label: string;
    choices: {
      label: string;
    }[];
  }[];
  largeImage: string;
}

export interface HeaderProps {
  imageUrl: string;
  restaurantName: string;
  activeTimePeriod: {
    open: string;
    close: string;
  };
}

export interface MenuCardProps {
  restaurantId: number;
  thumbnailImage?: string;
  name: string;
  sold: number;
  fullPrice: number;
  totalInStock: number;
  isTopSeller?: boolean;
  discountedPercent: number;
}

export interface MenuListProps {
  restaurantId: string;
}
