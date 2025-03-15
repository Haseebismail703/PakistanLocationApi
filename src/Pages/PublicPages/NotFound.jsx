import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-base-100">
    <Result
      status="404"
      title={<h1 className="text-5xl font-bold text-black ">404</h1>}
      subTitle={
        <p className="text-lg text-gray-600 ">
          Sorry, the page you visited does not exist.
        </p>
      }
      extra={
        <Link to={"/"}>
          <Button
            type="primary"
            className="bg-indigo-600 text-white hover:bg-indigo-500 "
          >
            Back Home
          </Button>
        </Link>
      }
    />
  </div>
);

export default NotFound;
