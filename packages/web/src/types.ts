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
  id: string;
  thumbnailImage: string;
  discountedPercent: number;
  fullPrice: number;
  sold: number;
  totalInStock: number;
}

export interface MenuCardProps {
  thumbnailImage?: string;
  name: string;
  sold: number;
  fullPrice: number;
  totalInStock: number;
}

export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  menu: {
    thumbnailImage?: string;
    name: string;
    sold: number;
    fullPrice: number;
    totalInStock: number;
  };
}

export interface FullMenu {
  name: string;
  id: string;
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
