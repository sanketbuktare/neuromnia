import "./Divider.css";

const Divider = ({ children }) => {
  return (
    <div class="divider">
      <span>{children}</span>
    </div>
  );
};

export default Divider;
