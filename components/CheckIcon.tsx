import { SVGProps } from "react";

const CheckIcon: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    width="17"
    height="9"
    viewBox="0 0 17 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.46556 8.82324L0.235652 4.90081C-0.0785507 4.66516 -0.0785507 4.28308 0.235652 4.0474L1.3735 3.19399C1.6877 2.95832 2.19718 2.95832 2.51138 3.19399L6.0345 5.8363L13.5806 0.176739C13.8948 -0.058913 14.4043 -0.058913 14.7185 0.176739L15.8563 1.03015C16.1705 1.2658 16.1705 1.64789 15.8563 1.88356L6.60344 8.82326C6.2892 9.05892 5.77976 9.05892 5.46556 8.82324Z"
      fill="#212121"
    />
  </svg>
);

export default CheckIcon;
