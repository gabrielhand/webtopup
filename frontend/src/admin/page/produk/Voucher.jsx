import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";

const Voucher = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Tambah Voucher
      </div>
    </div>
  );
};

export default Voucher;
