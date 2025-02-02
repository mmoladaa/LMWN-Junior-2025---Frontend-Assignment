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
