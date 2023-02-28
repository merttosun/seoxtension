import * as React from 'react'

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='8'
      height='7'
      viewBox='0 0 8 7'
      fill='none'
      {...props}
    >
      <path
        d='M7.69235 0.143714C7.35968 -0.100513 6.89433 -0.0257867 6.65204 0.309569L3.19268 5.10661L1.28706 3.15098C1.00631 2.84843 0.535188 2.83385 0.23521 3.11817C-0.0647677 3.40067 -0.0801511 3.87636 0.20252 4.17709C0.20252 4.17709 2.51773 6.61206 2.8504 6.85629C3.18307 7.10051 3.64842 7.02579 3.89071 6.69043L7.85772 1.1917C8.10001 0.854521 8.02502 0.386117 7.69235 0.143714Z'
        fill='white'
      />
    </svg>
  )
}

export default Check
