import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";
import { useGetAllTeamAgreementQuery } from "../../redux/features/TeamAgreement/TeamAgreement";

const UserAgreement = () => {
  const { data, error, isLoading } = useGetAllTeamAgreementQuery();
  console.log(data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading User Agreement</div>;
  }

  const content = data?.data?.attributes?.[0]?.content || "";

  return (
    <section className="w-full h-full min-h-screen ">
      <div className="flex justify-between items-center py-5 px-5  ">
        <div className="flex items-center space-x-3">
          <Link to="/settings">
            <IoChevronBack className="text-xl cursor-pointer text-[#193664]" />
          </Link>
          <h1 className="text-2xl font-semibold text-[#193664]">User Agreement</h1>
        </div>
        <Link to={'/settings/UserAgreement/1'}>
          <CustomButton border>
            <TbEdit className="text-xl" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>

      <div className="px-5 py-6 text-black text-xl">
        {/* Render content using dangerouslySetInnerHTML */}
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default UserAgreement;
