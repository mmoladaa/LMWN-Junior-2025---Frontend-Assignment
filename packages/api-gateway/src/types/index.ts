export interface Restaurant {
  name: string;
  id: number;
  coverImage: string;
  menus: string[];
  activeTimePeriod: {
    open: string;
    close: string;
  };
}

export interface Menu {
  name: string;
  id: string;
  thumbnailImage?: string;
  fullPrice: number;
  discountedPercent: number;
  discountedTimePeriod?: {
    begin: string;
    end: string;
  };
  sold: number;
  totalInStock: number;
}
