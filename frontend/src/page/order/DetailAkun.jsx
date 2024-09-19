import PropTypes from "prop-types";

const DetailAkun = ({ detailAkun }) => {
  return (
    <div
      id="DetailAkun-Content"
      className="flex flex-col gap-y-3 w-full rounded-xl px-5 py-5 bg-white dark:bg-[#323336] shadow-lg"
    >
      <div className="grid grid-cols-7 gap-x-2">
        <div className="col-span-4 flex flex-col gap-y-3">
          <p className="dark:text-white font-medium">User ID</p>
          <input
            type="number"
            name="ID ML"
            autoComplete="off"
            autoCorrect="off"
            id="user_id"
            autoSave="false"
            placeholder={detailAkun.placeholder_1}
            className="bg-slate-100 dark:bg-white dark:text-black w-full border border-[#4169e1] placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
          />
        </div>
        <div className="col-span-3 flex flex-col gap-y-3">
          <p className="dark:text-white font-medium">Server</p>
          <input
            type="number"
            name="ID ML"
            autoComplete="off"
            autoCorrect="off"
            id="user_id"
            autoSave="false"
            placeholder={detailAkun.placeholder_2}
            className="bg-slate-100 dark:bg-white dark:text-black w-full border border-[#4169e1] placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
          />
        </div>
      </div>
      <hr className="border-black dark:border-white"></hr>
      <p className="text-xs text-black dark:text-white">NB : </p>
      <div className="flex flex-row w-full bg-slate-100 dark:bg-white rounded-xl px-3 py-2 border border-[#4169e1]">
        <p className="text-black text-sm">{detailAkun.ket_id}</p>
      </div>
    </div>
  );
};

DetailAkun.propTypes = {
  detailAkun: PropTypes.shape({
    placeholder_1: PropTypes.string.isRequired,
    placeholder_2: PropTypes.string.isRequired,
    ket_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailAkun;
