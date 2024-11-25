import { Link } from "react-router-dom";
import { ICONS } from "../../../assets";

type THeading = {
  isArrowVisible?: boolean;
  path?: string;
  title: string;
};
const Heading: React.FC<THeading> = ({ isArrowVisible, path, title }) => {
  return (
    <div className="flex items-center gap-3">
      {isArrowVisible && (
        <Link to={path ? path : ""}>
          <img src={ICONS.rightArrow} alt="" className="size-10" />
        </Link>
      )}
      <h1 className="text-[#293241] text-[32px] font-semibold leading-10 font-Poppins">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
