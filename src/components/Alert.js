import { useEffect, useState, useRef } from 'react';
import { subscribe } from '../utility/pubsub';
import './Alert.css'

function Alert() {
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(true);
  const resetting = useRef(false);

  let showRef = useRef();
  showRef.current = show;

  useEffect(() => {
    let timeout;
    subscribe('ALERT', (message) => {
      setMessage(message);
      setShow(true);
      setHidden(false);
      
      if (resetting.current) {
        clearInterval(timeout);
        resetting.current = false;
      }
      resetting.current = true;
      timeout = setTimeout(() => {
        setShow(false);
      }, 1000);
    });
  }, [])
    
    function hide() {
    if(showRef) return
    setMessage();
    setHidden(true)
  }

  const style = {
    display: hidden ? 'block' : 'hidden',
    opacity: show ? 1 : 0,
  };

  return <div className="alert" style={style} onTransitionEnd={hide}>{message}</div>;
}

export default Alert;
