declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "react" {
  interface CSSProperties {
    [key: string]: any;
  }
}
