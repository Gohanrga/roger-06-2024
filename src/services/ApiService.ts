import apiClient from "./axios";
import useLoaderStore from "../store/useLoader";
export default class ApiService {
  private loaderStore = useLoaderStore();
  async get(url: string) {
    try {
      this.loaderStore.handleLoaderGlobal(true);
      return apiClient.get(url);
    } catch (error) {
      this.loaderStore.handleLoaderGlobal(false);
      console.error("Error in get method: ", error);
    } finally {
      this.loaderStore.handleLoaderGlobal(false);
    }
  }
}
