import { SVGProps } from "react";

const LogoutIcon: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    width="32"
    height="26"
    viewBox="0 0 32 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M31.2 22.4H27.2V5.67245C27.2 4.30945 26.1235 3.19995 24.8 3.19995H19.2V6.39995H24V25.6H31.2C31.642 25.6 32 25.242 32 24.8V23.2C32 22.758 31.642 22.4 31.2 22.4ZM15.612 0.0504513L6.012 2.53745C5.2995 2.72195 4.8 3.38495 4.8 4.14595V22.4H0.8C0.358 22.4 0 22.758 0 23.2V24.8C0 25.242 0.358 25.6 0.8 25.6H17.6V1.65895C17.6 0.579951 16.622 -0.211549 15.612 0.0504513ZM13.2 14.4C12.5375 14.4 12 13.6835 12 12.8C12 11.9165 12.5375 11.2 13.2 11.2C13.8625 11.2 14.4 11.9165 14.4 12.8C14.4 13.6835 13.8625 14.4 13.2 14.4Z"
      fill="white"
    />
  </svg>
);

export default LogoutIcon;
