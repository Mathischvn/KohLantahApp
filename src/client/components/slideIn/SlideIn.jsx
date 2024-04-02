import './SlideIn.css';
const SlideIn = ({ children, startAnimation }) => {
  const transtionProperties = startAnimation
    ? { marginLeft: '0px', opacity: 1 }
    : {};
  return (
    <div className="slide-in" style={transtionProperties}>
      {children}
    </div>
  );
};
export default SlideIn;