import { Link } from "react-router-dom";

export const AuthText = ({text, accion, info, url}) => {
  return (
    <div className="flex flex-col gap-4 ">
      <h3 className="text-3xl font-bold">{text}</h3>
      <p className="text-sm text-gray-500">
        {info}{" "}
        <span className="text-cyan-600 font-bold cursor-pointer border-b border-blue-700">
          <Link to={url}>{accion}</Link>
        </span>
      </p>
    </div>
  );
};
