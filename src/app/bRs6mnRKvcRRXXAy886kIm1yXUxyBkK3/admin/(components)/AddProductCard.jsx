import { useAppContext } from "@/app/(context)/AppWrapper";
import Link from "next/link";

export default function AddProductCard() {
  const {
    showLoading,
  } = useAppContext()

  return (
    <div id="card-product" className="produk-card-admin rounded-[15px] overflow-hidden group min-w-[250px] max-w-[250px] hover:scale-105 active:scale-100 transition-all">
      <Link
        onClick={() => showLoading()}
        className="grid place-items-center min-h-[234.09px] h-full  p-[3px]"
        href={`/bRs6mnRKvcRRXXAy886kIm1yXUxyBkK3/admin/tambah-produk`}
      >
        <div className="grid place-items-center bg-ble-50 w-full h-full rounded-[12px]">
          <div className="grid place-items-center">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.9163 32.9163H44.583C45.3566 32.9163 46.0984 32.6091 46.6454 32.0621C47.1924 31.5151 47.4997 30.7732 47.4997 29.9997C47.4997 29.2261 47.1924 28.4843 46.6454 27.9373C46.0984 27.3903 45.3566 27.083 44.583 27.083H32.9163V15.4163C32.9163 14.6428 32.6091 13.9009 32.0621 13.3539C31.5151 12.807 30.7732 12.4997 29.9997 12.4997C29.2261 12.4997 28.4843 12.807 27.9373 13.3539C27.3903 13.9009 27.083 14.6428 27.083 15.4163V27.083H15.4163C14.6428 27.083 13.9009 27.3903 13.3539 27.9373C12.807 28.4843 12.4997 29.2261 12.4997 29.9997C12.4997 30.7732 12.807 31.5151 13.3539 32.0621C13.9009 32.6091 14.6428 32.9163 15.4163 32.9163H27.083V44.583C27.083 45.3566 27.3903 46.0984 27.9373 46.6454C28.4843 47.1924 29.2261 47.4997 29.9997 47.4997C30.7732 47.4997 31.5151 47.1924 32.0621 46.6454C32.6091 46.0984 32.9163 45.3566 32.9163 44.583V32.9163ZM12.4997 0.833008H47.4997C50.5939 0.833008 53.5613 2.06217 55.7493 4.2501C57.9372 6.43802 59.1663 9.40548 59.1663 12.4997V47.4997C59.1663 50.5939 57.9372 53.5613 55.7493 55.7493C53.5613 57.9372 50.5939 59.1663 47.4997 59.1663H12.4997C9.40548 59.1663 6.43802 57.9372 4.2501 55.7493C2.06217 53.5613 0.833008 50.5939 0.833008 47.4997V12.4997C0.833008 9.40548 2.06217 6.43802 4.2501 4.2501C6.43802 2.06217 9.40548 0.833008 12.4997 0.833008Z"
                fill="url(#paint0_radial_930_2)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_930_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(-66 -22.0003) rotate(34.7462) scale(248.271 221.263)"
                >
                  <stop offset="0.341167" stop-color="#67DCB1" />
                  <stop offset="1" stop-color="#459DFC" stop-opacity="0.9" />
                </radialGradient>
              </defs>
            </svg>

            <h3 className="text-grn-600 font-normal text-base xl:text-xl">
              Tambah Produk
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
