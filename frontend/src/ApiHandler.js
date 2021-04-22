import axios from "axios";

export const ApiHandler = {
  getOsuSkins: async function () {
    try {
      const result = await axios.get(
        "http://redditosuskins.eastus.azurecontainer.io:8000/api/osuskins"
      );
      return result.data;
    } catch (e) {
      console.log("error in getOsuSkins");
      console.log(e);
    }
  },
};
