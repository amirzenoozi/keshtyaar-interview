export interface IMenuItem {
  icon: any;
  label: string;
  clickHandler: () => void;
}

export interface IPopperMenuItems {
  items: IMenuItem[];
  icon: any;
}
