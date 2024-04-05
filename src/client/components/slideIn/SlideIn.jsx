import './SlideIn.css';
const SlideIn = ({ children, startAnimation }) => {
  const transtionProperties = startAnimation
    ? { marginLeft: '0px', opacity: 1 }
    : { marginLeft: '-3000px', opacity: 1 };
  if (startAnimation){
    return (
      <div className="slide-in" style={transtionProperties}>
        {children}
      </div>
    );
  }
  else{
    return (
      <div className="slide-out" style={transtionProperties}>
        {children}
      </div>
    );
  }
};
export default SlideIn;