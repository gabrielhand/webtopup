import ShoppingCartImage from "../../assets/shopping-cart.png";
import AddToCartImage from "../../assets/add-to-cart.png";

const Quantity = () => {
  return (
    <div id="Quantity-Content" className="flex flex-col gap-y-3">
      <div className="flex flex-row gap-x-2">
        <div className="flex flex-row justify-between bg-[#4169e1] rounded-xl w-full overflow-visible">
          <p className="px-5 py-3 text-white font-medium">Jumlah Pembelian</p>
          <figure className="relative">
            <img src={AddToCartImage} alt="AddToCart-Image" className="absolute lg:right-6 right-8 -top-4 max-w-20 max-h-20" />
          </figure>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 w-full rounded-xl p-5 bg-white dark:bg-[#323336] shadow-lg">
        <div className="grid grid-cols-3 gap-x-4">
          <div className="col-span-2">
            <input
              type="number"
              name="quantity"
              autoComplete="off"
              autoCorrect="off"
              id="quantityInput"
              autoSave="false"
              value="1"
              readOnly
              placeholder="Masukkan Jumlah Pembelian"
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-[#4169e1] placeholder:font-medium font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-1 flex flex-row gap-x-2">
            <button
              id="btn-plus-quan"
              className="text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#4169e1] hover:bg-[#4169e1]/80 p-2.5"
              type="button"
              disabled
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
            <button
              id="btn-min-quan"
              className="text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#4169e1] hover:bg-[#4169e1]/80 p-2.5"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantity;
