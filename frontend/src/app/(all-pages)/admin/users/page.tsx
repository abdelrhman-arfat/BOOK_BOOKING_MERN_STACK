import ShowUsers from "@/app/_components/ui/ShowUsers";

const Page = () => {
  return (
    <div className="w-full sm:px-5 py-4">
      <h1 className="text-2xl text-center text-gray-800 font-bold">Users List</h1>
      <ShowUsers />
    </div>
  );
};

export default Page;
