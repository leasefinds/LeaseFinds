import  React, {useEffect} from "react"

// My Hook - the new way
export default function useResizer() {
  const isClient = typeof window === 'object';

  function getSize() {
    return isClient ? window.innerWidth : undefined
  }

  const initialWidth = getSize()
  const [isMobile, setIsMobile] = React.useState(initialWidth < 768);

  useEffect(() => {

    function handleSizeChange() {
      return setIsMobile(window.innerWidth < 768);
    }
    
    window.addEventListener("resize", handleSizeChange);
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, [isMobile]);

  return isMobile;
}