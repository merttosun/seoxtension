import * as React from 'react'

function ArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='6'
      height='8'
      viewBox='0 0 6 8'
      fill='none'
      {...props}
    >
      <path
        d='M5.82406 4.05542C5.58947 3.80345 5.21029 3.80345 4.9757 4.05542L3.59997 5.53311V0.644434C3.59997 0.288706 3.33178 0 3 0C2.66822 0 2.40003 0.288706 2.40003 0.644434V5.53311L1.0243 4.05542C0.78971 3.80345 0.410529 3.80345 0.175941 4.05542C-0.0586471 4.3074 -0.0586471 4.71468 0.175941 4.96665L3 8L5.82406 4.96665C6.05865 4.71468 6.05865 4.3074 5.82406 4.05542Z'
        fill='white'
      />
    </svg>
  )
}

export default ArrowDown
