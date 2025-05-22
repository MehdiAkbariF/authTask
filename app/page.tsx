import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-amber-100 flex justify-center items-center h-screen">
      
      <Link href="/exist">
        <button className="p-5 bg-green-600 rounded-full
        cursor-pointer hover:bg-green-800 duration-300">ورود به سایت</button>
      </Link>
    </div>
  );
};

export default Page;
