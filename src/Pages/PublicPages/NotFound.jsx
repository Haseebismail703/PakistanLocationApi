import { Link } from "react-router-dom";
import HomeNav from "../../Component/PublicCom/HomeNavbar";
// import NotFoundImage from "../../assets/404.svg"; // Apni image ka path add karein

const NotFound = () => {
  return (
    <>
      <HomeNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content transition-all duration-300" data-theme="light dark">
        {/* Image */}
        <img
          src={"https://cdn3d.iconscout.com/3d/premium/thumb/search-user-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--find-details-seo-pack-web-illustrations-4146836.png?f=webp"}
          alt="404 Not Found"
          className="w-80 md:w-96 lg:w-[400px]"
        />

        {/* Heading */}
        <h1 className="text-5xl font-bold">404</h1>

        {/* Subtitle */}
        <p className="text-lg  text-center mt-2">
          Sorry, the page you visited does not exist.
        </p>
        {/* Button */}
        <Link to={"/"}>
          <button className="mt-6 px-6 py-3 btn btn-primary">
            Back Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
