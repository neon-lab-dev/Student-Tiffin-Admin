
type ConfirmationModalProps = {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
  };

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({openModal, setOpenModal}) => {
   
    return (
        <div className="mx-auto flex w-72 items-center justify-center">
        <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
          <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-[738px] p-8 rounded-3xl bg-white drop-shadow-2xl ${openModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
            <div className="flex flex-col gap-8">
              <h1 className="text-[#293241] font-Poppins text-[32px] font-semibold leading-[42px]">Are you sure you want to remove this product from your menu? This action cannot be undone.</h1>
              <hr className="border border-[#6e78831f]" />

              <div className="flex items-center justify-end gap-4">
        <button
        onClick={() => setOpenModal(false)}
          type="submit"
          className="px-6 py-[14px] text-white bg-[#8D9095] rounded-xl text-lg leading-6 font-semibold"
        >
        No, Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-[14px] text-white bg-[#E28413] rounded-xl text-lg leading-6 font-semibold"
        >
          Yes, Delete
        </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ConfirmationModal;