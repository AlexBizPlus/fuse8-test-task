declare module "*.module.css";
declare module "*.module.scss";

declare module "*.png" {
  const content: any;
  export default content;
}
