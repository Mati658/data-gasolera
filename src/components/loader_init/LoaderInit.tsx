import { useEffect } from 'react';
import { useLoader } from '../../context/LoaderContext';

export default function LoaderInit() {
  const { setLoader } = useLoader();

  useEffect(() => {
    setLoader(true);

    const images = Array.from(document.images);
    let loadedCount = 0;

    const minTimeout = setTimeout(() => {
      if (loadedCount === images.length) {
        setLoader(false);
      }
    }, 1500);

    const handleImgLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        if (minTimeout) {
        } else {
          setLoader(false);
        }
      }
    };

    if (images.length === 0) {
      setTimeout(() => setLoader(false), 1500);
    } else {
      images.forEach((img) => {
        if (img.complete) {
          handleImgLoad();
        } else {
          img.addEventListener("load", handleImgLoad);
          img.addEventListener("error", handleImgLoad);
        }
      });
    }

    return () => {
      clearTimeout(minTimeout);
      images.forEach((img) => {
        img.removeEventListener("load", handleImgLoad);
        img.removeEventListener("error", handleImgLoad);
      });
    };
  }, []);

  return null;
}
