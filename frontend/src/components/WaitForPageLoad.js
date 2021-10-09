import { BeatLoader } from "react-spinners";

const WaitForPageLoad = () => {
    return <div id="waitForPageLoading" align="center">
    <BeatLoader size={50} color="#24292E" loading />
    <br/>
    <b className="waitForPageLoadingText">
      {process.env.REACT_APP_PLATFORM_NAME}
    </b>
  </div>
}

export default WaitForPageLoad;