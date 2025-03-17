import FavBooks from "@/app/_components/ui/FavBooks";

const page = () => {
  return (
    <div className="px-2 sm:px-10">
      <h1 className="text-3xl font-bold text-center">My Favorite Books</h1>
      <FavBooks />
    </div>
  );
};

export default page;
