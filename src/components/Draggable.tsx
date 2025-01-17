import React, { ReactNode, useRef, useState } from "react";
import { DragEndEvent, useDraggable } from "@dnd-kit/core";
import type { DraggableSyntheticListeners, Translate } from "@dnd-kit/core";

export const draggable = (
  <svg
    width="164px"
    height="43px"
    viewBox="0 0 164 43"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M42.3045805,21.1324327 L36.2525369,27.1844763 L34.5266208,25.4585603 L37.6269502,22.3582309 L26.7555941,22.3684498 L26.7578974,19.9255979 L37.6292535,19.915379 L34.5347379,16.8208634 L36.2638746,15.0917268 L42.3045805,21.1324327 Z M-7.10542736e-15,21.1721478 L6.05204361,15.1201042 L7.77795964,16.8460202 L4.67763031,19.9463495 L15.5489864,19.9361307 L15.5466831,22.3789826 L4.67532697,22.3892015 L7.76984257,25.4837171 L6.04070592,27.2128537 L-7.10542736e-15,21.1721478 Z M27.2130082,6.04086037 L25.4838715,7.76999702 L22.3893559,4.67548142 L22.3791371,15.5468375 L19.9362851,15.5491408 L19.946504,4.67778476 L16.8461747,7.77811409 L15.1202586,6.05219806 L21.1723023,0.000154447508 L27.2130082,6.04086037 Z M22.3686045,26.7554394 L22.3584184,37.6267628 L25.4587477,34.5264334 L27.1846637,36.2523495 L21.1325874,42.3044257 L15.0918815,36.2637198 L16.8210508,34.5345505 L19.9155664,37.6290661 L19.9257526,26.7577427 L22.3686045,26.7554394 Z M53.0741994,21.9176266 C53.0741994,19.9403826 53.522128,18.3656447 54.4179988,17.1933657 C55.3138695,16.0210866 56.5392602,15.4349559 58.0942076,15.4349559 C59.3413228,15.4349559 60.3713614,15.8960454 61.1843542,16.8182383 L61.1843542,10.3472902 L64.6178504,10.3472902 L64.6178504,28.3534065 L61.5277038,28.3534065 L61.3619489,27.0052923 C60.5094904,28.0603434 59.4123612,28.5878611 58.0705284,28.5878611 C56.5629397,28.5878611 55.3533351,27.9997766 54.4416781,26.8235899 C53.5300211,25.6474033 53.0741994,24.0120985 53.0741994,21.9176266 Z M56.495856,22.163804 C56.495856,23.3517134 56.7050209,24.2621699 57.123357,24.8952005 C57.5416931,25.5282312 58.1494553,25.8447418 58.9466619,25.8447418 C60.0043418,25.8447418 60.7502318,25.40319 61.1843542,24.5200731 L61.1843542,19.5144666 C60.758125,18.6313497 60.020128,18.1897979 58.9703412,18.1897979 C57.3206761,18.1897979 56.495856,19.5144533 56.495856,22.163804 Z M74.7671193,18.8462709 C74.3014244,18.7837493 73.8909875,18.752489 73.5357965,18.752489 C72.2413225,18.752489 71.3928233,19.1862258 70.9902735,20.0537123 L70.9902735,28.3534065 L67.5686169,28.3534065 L67.5686169,15.6694105 L70.8008392,15.6694105 L70.8955563,17.1816429 C71.582259,16.0171791 72.5333674,15.4349559 73.7489101,15.4349559 C74.1277805,15.4349559 74.4829662,15.4857539 74.8144778,15.5873514 L74.7671193,18.8462709 Z M83.7797825,28.3534065 C83.6219198,28.0486139 83.5074711,27.6695827 83.4364329,27.2163015 C82.6076538,28.1306791 81.5302571,28.5878611 80.2042106,28.5878611 C78.9492022,28.5878611 77.9092974,28.2283676 77.0844649,27.5093698 C76.2596324,26.7903719 75.8472223,25.8838231 75.8472223,24.789696 C75.8472223,23.4454826 76.3504021,22.4138925 77.3567767,21.6948947 C78.3631513,20.9758969 79.8174394,20.6124959 81.7196848,20.6046807 L83.2943572,20.6046807 L83.2943572,19.8778713 C83.2943572,19.2917318 83.1424166,18.8228272 82.8385309,18.4711435 C82.5346453,18.1194597 82.0551446,17.9436205 81.4000144,17.9436205 C80.8238156,17.9436205 80.3719405,18.0803844 80.0443754,18.3539161 C79.7168103,18.6274479 79.5530303,19.0025716 79.5530303,19.4792984 L76.1313737,19.4792984 C76.1313737,18.7446702 76.3602712,18.0647585 76.8180729,17.439543 C77.2758747,16.8143276 77.923102,16.3239315 78.7597742,15.9683402 C79.5964465,15.6127489 80.5357153,15.4349559 81.5776091,15.4349559 C83.1562359,15.4349559 84.4092522,15.8276635 85.3366954,16.6130904 C86.2641387,17.3985174 86.7278534,18.502397 86.7278534,19.9247622 L86.7278534,25.4227235 C86.7357465,26.6262633 86.9054463,27.5367197 87.236958,28.15412 L87.236958,28.3534065 L83.7797825,28.3534065 Z M80.950108,25.9971373 C81.4552686,25.9971373 81.9209566,25.8857725 82.3471858,25.6630395 C82.773415,25.4403065 83.0891357,25.1413798 83.2943572,24.7662505 L83.2943572,22.5858224 L82.0156758,22.5858224 C80.3028657,22.5858224 79.3912224,23.1719531 79.2807185,24.3442321 L79.2688789,24.5435186 C79.2688789,24.965539 79.4188462,25.3133099 79.7187853,25.5868417 C80.0187244,25.8603735 80.4291612,25.9971373 80.950108,25.9971373 Z M89.1576756,21.9176266 C89.1576756,19.9716434 89.6253368,18.4047206 90.5606732,17.2168111 C91.4960096,16.0289017 92.7569188,15.4349559 94.3434388,15.4349559 C95.7484167,15.4349559 96.8415994,15.9116756 97.6230197,16.8651292 L97.7650954,15.6694105 L100.867082,15.6694105 L100.867082,27.9313881 C100.867082,29.0411456 100.612532,30.0063075 100.103425,30.8269029 C99.5943175,31.6474982 98.8780263,32.2727043 97.9545296,32.70254 C97.0310329,33.1323756 95.9496898,33.3472902 94.7104677,33.3472902 C93.7711848,33.3472902 92.8555949,33.1616822 91.9636708,32.7904605 C91.0717466,32.4192388 90.3968937,31.9405653 89.939092,31.3544258 L91.4545661,29.291225 C92.3070246,30.2368634 93.3410097,30.7096756 94.5565524,30.7096756 C95.4642628,30.7096756 96.1706877,30.469362 96.6758483,29.9887276 C97.1810089,29.5080931 97.4335854,28.8262277 97.4335854,27.9431108 L97.4335854,27.2631924 C96.644272,28.1463093 95.6063404,28.5878611 94.3197595,28.5878611 C92.7805984,28.5878611 91.5354751,27.9919615 90.5843525,26.8001445 C89.6332298,25.6083274 89.1576756,24.0277282 89.1576756,22.0582994 L89.1576756,21.9176266 Z M92.5793321,22.163804 C92.5793321,23.3126375 92.8121761,24.213325 93.277871,24.8658937 C93.7435659,25.5184624 94.3829002,25.8447418 95.195893,25.8447418 C96.2377868,25.8447418 96.9836767,25.4578955 97.4335854,24.6841914 L97.4335854,19.3503483 C96.9757836,18.5766442 96.2377866,18.1897979 95.2195723,18.1897979 C94.3986864,18.1897979 93.7534323,18.5219386 93.2837908,19.1862301 C92.8141494,19.8505216 92.5793321,20.8430363 92.5793321,22.163804 Z M103.296904,21.9176266 C103.296904,19.9716434 103.764565,18.4047206 104.699901,17.2168111 C105.635238,16.0289017 106.896147,15.4349559 108.482667,15.4349559 C109.887645,15.4349559 110.980828,15.9116756 111.762248,16.8651292 L111.904324,15.6694105 L115.00631,15.6694105 L115.00631,27.9313881 C115.00631,29.0411456 114.75176,30.0063075 114.242653,30.8269029 C113.733546,31.6474982 113.017255,32.2727043 112.093758,32.70254 C111.170261,33.1323756 110.088918,33.3472902 108.849696,33.3472902 C107.910413,33.3472902 106.994823,33.1616822 106.102899,32.7904605 C105.210975,32.4192388 104.536122,31.9405653 104.07832,31.3544258 L105.593794,29.291225 C106.446253,30.2368634 107.480238,30.7096756 108.695781,30.7096756 C109.603491,30.7096756 110.309916,30.469362 110.815077,29.9887276 C111.320237,29.5080931 111.572814,28.8262277 111.572814,27.9431108 L111.572814,27.2631924 C110.7835,28.1463093 109.745569,28.5878611 108.458988,28.5878611 C106.919827,28.5878611 105.674703,27.9919615 104.723581,26.8001445 C103.772458,25.6083274 103.296904,24.0277282 103.296904,22.0582994 L103.296904,21.9176266 Z M106.71856,22.163804 C106.71856,23.3126375 106.951404,24.213325 107.417099,24.8658937 C107.882794,25.5184624 108.522128,25.8447418 109.335121,25.8447418 C110.377015,25.8447418 111.122905,25.4578955 111.572814,24.6841914 L111.572814,19.3503483 C111.115012,18.5766442 110.377015,18.1897979 109.358801,18.1897979 C108.537915,18.1897979 107.892661,18.5219386 107.423019,19.1862301 C106.953378,19.8505216 106.71856,20.8430363 106.71856,22.163804 Z M125.356853,28.3534065 C125.19899,28.0486139 125.084541,27.6695827 125.013503,27.2163015 C124.184724,28.1306791 123.107327,28.5878611 121.781281,28.5878611 C120.526272,28.5878611 119.486368,28.2283676 118.661535,27.5093698 C117.836702,26.7903719 117.424292,25.8838231 117.424292,24.789696 C117.424292,23.4454826 117.927472,22.4138925 118.933847,21.6948947 C119.940221,20.9758969 121.39451,20.6124959 123.296755,20.6046807 L124.871427,20.6046807 L124.871427,19.8778713 C124.871427,19.2917318 124.719487,18.8228272 124.415601,18.4711435 C124.111715,18.1194597 123.632215,17.9436205 122.977085,17.9436205 C122.400886,17.9436205 121.949011,18.0803844 121.621446,18.3539161 C121.29388,18.6274479 121.1301,19.0025716 121.1301,19.4792984 L117.708444,19.4792984 C117.708444,18.7446702 117.937341,18.0647585 118.395143,17.439543 C118.852945,16.8143276 119.500172,16.3239315 120.336844,15.9683402 C121.173517,15.6127489 122.112785,15.4349559 123.154679,15.4349559 C124.733306,15.4349559 125.986322,15.8276635 126.913766,16.6130904 C127.841209,17.3985174 128.304923,18.502397 128.304923,19.9247622 L128.304923,25.4227235 C128.312817,26.6262633 128.482516,27.5367197 128.814028,28.15412 L128.814028,28.3534065 L125.356853,28.3534065 Z M122.527178,25.9971373 C123.032339,25.9971373 123.498027,25.8857725 123.924256,25.6630395 C124.350485,25.4403065 124.666206,25.1413798 124.871427,24.7662505 L124.871427,22.5858224 L123.592746,22.5858224 C121.879936,22.5858224 120.968292,23.1719531 120.857789,24.3442321 L120.845949,24.5435186 C120.845949,24.965539 120.995916,25.3133099 121.295855,25.5868417 C121.595794,25.8603735 122.006231,25.9971373 122.527178,25.9971373 Z M142.775662,22.1286358 C142.775662,24.1605862 142.337599,25.7450929 141.461461,26.8822036 C140.585324,28.0193143 139.361906,28.5878611 137.791172,28.5878611 C136.401981,28.5878611 135.293012,28.0603434 134.464233,27.0052923 L134.310318,28.3534065 L131.232011,28.3534065 L131.232011,10.3472902 L134.653667,10.3472902 L134.653667,16.8065155 C135.442981,15.8921379 136.480912,15.4349559 137.767493,15.4349559 C139.330334,15.4349559 140.555724,16.0035027 141.443702,17.1406134 C142.33168,18.2777241 142.775662,19.877861 142.775662,21.9410721 L142.775662,22.1286358 Z M139.354005,21.8824584 C139.354005,20.6007667 139.148787,19.6649113 138.738344,19.0748641 C138.327901,18.484817 137.716192,18.1897979 136.903199,18.1897979 C135.813947,18.1897979 135.06411,18.6313497 134.653667,19.5144666 L134.653667,24.5200731 C135.072003,25.4110052 135.829733,25.8564646 136.926879,25.8564646 C138.031917,25.8564646 138.758075,25.3172243 139.105373,24.2387276 C139.271128,23.7229248 139.354005,22.9375096 139.354005,21.8824584 Z M148.792895,28.3534065 L145.359399,28.3534065 L145.359399,10.3472902 L148.792895,10.3472902 L148.792895,28.3534065 Z M157.805559,28.5878611 C155.926993,28.5878611 154.397721,28.0173605 153.217697,26.8763422 C152.037674,25.735324 151.447671,24.2152916 151.447671,22.3161995 L151.447671,21.987963 C151.447671,20.7140865 151.696301,19.5750391 152.193568,18.5707867 C152.690836,17.5665343 153.395287,16.7928417 154.306944,16.2496858 C155.218601,15.7065298 156.258506,15.4349559 157.42669,15.4349559 C159.178966,15.4349559 160.55827,15.9820112 161.564645,17.0761384 C162.57102,18.1702655 163.074199,19.7215581 163.074199,21.7300629 L163.074199,23.1133453 L154.916686,23.1133453 C155.02719,23.9417558 155.36067,24.6060373 155.917136,25.1062097 C156.473602,25.6063821 157.178053,25.8564646 158.030512,25.8564646 C159.348665,25.8564646 160.378704,25.3836524 161.120658,24.438014 L162.801888,26.3019284 C162.288834,27.0209262 161.594249,27.5816579 160.718111,27.9841404 C159.841973,28.3866229 158.871132,28.5878611 157.805559,28.5878611 Z M157.41485,18.1780752 C156.736041,18.1780752 156.185503,18.4047124 155.76322,18.8579936 C155.340938,19.3112748 155.070602,19.9599262 154.952205,20.8039671 L159.711741,20.8039671 L159.711741,20.5343443 C159.695955,19.7840857 159.490736,19.2038162 159.09608,18.7935186 C158.701423,18.3832209 158.141019,18.1780752 157.41485,18.1780752 Z"
        fill="#FFFFFF"
      ></path>
    </g>
  </svg>
);

export interface Props {
  dragOverlay?: boolean;
  label?: string;
  listeners?: React.HTMLAttributes<HTMLButtonElement>;
  translate?: { x: number; y: number };
}

export const Draggable: React.FC<Props> = ({
  dragOverlay,
  label,
  listeners,
  translate,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      style={
        {
          "--translate-x": `${translate?.x ?? 0}px`,
          "--translate-y": `${translate?.y ?? 0}px`,
        } as React.CSSProperties
      }
    >
      <button
        ref={buttonRef}
        {...props}
        className="bg-pink-400 p-2 w-32"
        aria-label="Draggable"
        data-cypress="draggable-item"
      >
        {draggable}
      </button>
      {label ? <label>{label}</label> : null}
    </div>
  );
};
