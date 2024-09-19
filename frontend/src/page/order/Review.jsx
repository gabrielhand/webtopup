import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import Test from "../../assets/react.svg";

dayjs.extend(relativeTime);
dayjs.locale("id");

const Review = ({ allratings }) => {
  return (
    <div
      id="Review-Content"
      className="flex flex-row w-full rounded-xl p-5 bg-white dark:bg-[#323336] shadow-lg"
    >
      <div className="flex flex-col gap-y-2 justify-center w-full">
        <div className="flex flex-row justify-center items-center w-full text-3xl">
          <p className="text-black dark:text-white">{allratings.mostlyStar}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="text-yellow-400 h-8 w-8 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="flex flex-row w-full">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            perspiciatis.
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          {allratings.ratings.map((rating) => (
            <div
              key={rating.id}
              className="flex flex-col w-full py-1 border-t border-gray-400 dark:border-white"
            >
              <div className="flex flex-row w-full">
                <div className="flex flex-col gap-y-2 w-full">
                  <div className="flex flex-row gap-x-2 w-full">
                    <figure>
                      <img
                        src={rating.image ? rating.image : Test}
                        alt="Image User"
                        className="max-w-10 rounded-full mt-1"
                      />
                    </figure>
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row justify-between w-full">
                        <p className="text-black dark:text-white font-semibold">
                          {rating.nama}
                        </p>
                        <div className="flex flex-row items-center">
                          {[...Array(rating.bintang)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              data-slot="icon"
                              className="text-yellow-400 h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-black dark:text-slate-200 font-light -mt-0.5">
                        {rating.comment}
                      </p>
                      <p className="text-sm text-black dark:text-white line-clamp-1 font-light mt-1">
                        {rating.layanan}
                      </p>
                    </div>
                  </div>
                  <p className="text-black dark:text-zinc-300 text-xs font-light flex flex-row justify-end">
                    {dayjs(rating.created_at).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t border-gray-400 dark:border-white" />
      </div>
    </div>
  );
};

export default Review;
