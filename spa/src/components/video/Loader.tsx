import "./loader.css";


export default function Loader(props:any){
  return (
    <div className="wrapper" {...props}>
      <div className="spinner"></div>
      <p>{props.children}</p>
    </div>
  );
};
